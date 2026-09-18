import 'dotenv/config'
import { Bee } from '@ethersphere/bee-js'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import ids from '../archive-identifiers.json' with { type: 'json' }

const endpoint = process.env.BEE_URL ?? 'http://localhost:1633'
const batchId = process.env.POSTAGE_BATCH_ID
const privateKey = process.env.FEED_PRIVATE_KEY
const source = process.argv[2]
if (!source || !batchId || !privateKey) throw new Error('Usage: POSTAGE_BATCH_ID=… FEED_PRIVATE_KEY=… npm run publish -- <folio-directory>')

const bee = new Bee(endpoint)
const files = await Promise.all((await readdir(source)).map(async name => {
  const uploaded = await bee.data.upload(batchId, await readFile(join(source, name)))
  return { name, reference: uploaded.reference.toString() }
}))
const manifest = { format: ids.format, version: ids.formatVersion, publishedAt: new Date().toISOString(), files }
const uploadedManifest = await bee.data.upload(batchId, JSON.stringify(manifest))

// A network read occurs immediately before each update. An empty feed is a valid first publish.
const writer = bee.feed.makeWriter(ids.topic, privateKey)
try {
  await bee.feed.fetchLatestUpdate(ids.topic, ids.feedOwner)
} catch (error) {
  console.info('No feed update yet; publishing the first archive revision.')
}
// Omitted index asks Bee to append after the network-resolved latest index.
await writer.uploadReference(batchId, uploadedManifest.reference)
const batch = await bee.stamp.get(batchId)
console.info(JSON.stringify({ archiveAddress: { owner: ids.feedOwner, topic: ids.topic }, manifest: uploadedManifest.reference.toString(), remainingLifetime: batch.duration.toString() }, null, 2))
