import { Bee } from '@ethersphere/bee-js'
import ids from '../archive-identifiers.json' with { type: 'json' }

const endpoint = process.argv[process.argv.indexOf('--bee') + 1] || 'http://localhost:1633'
const bee = new Bee(endpoint)
// This entrypoint uses only the published owner/topic and caller-provided Bee endpoint.
const reader = bee.feed.makeReader(ids.topic, ids.feedOwner)
const update = await reader.downloadReference()
const manifestResponse = await bee.data.download(update.reference)
const manifest = JSON.parse(manifestResponse.toUtf8()) as { collection?: { collection?: string; description?: string }; files: { name: string; reference: string }[] }
if (manifest.collection?.collection) console.log(`${manifest.collection.collection}\n${manifest.collection.description ?? ''}\n`)
for (const file of manifest.files) {
  const bytes = await bee.data.download(file.reference)
  console.log(`${file.name}\t${bytes.length} bytes\t${file.reference}`)
}
