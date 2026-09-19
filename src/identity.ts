import 'dotenv/config'
import { PrivateKey } from '@ethersphere/core-sdk'

const key = process.env.FEED_PRIVATE_KEY
if (!key) throw new Error('Set FEED_PRIVATE_KEY in the ignored .env first.')
console.log(new PrivateKey(key).publicKey().address().toChecksum())
