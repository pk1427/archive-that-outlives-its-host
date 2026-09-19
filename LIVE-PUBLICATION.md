# Live publication evidence

Published through a funded local Bee node in light mode on 2026-09-20.

## Public recovery address

| Identifier | Value |
| --- | --- |
| Feed owner | `0x534eEB279FF717d997d0A7C567364FFb14fe4143` |
| Feed topic | `0x7b2e4e4ce0d827b0f9e2398bf05df5fccca63ee9c027bd224852964bbc27f2f1` |
| Current manifest | `2a8d15758328a7750f559f3cdb4f9ac0472e2dad4757b382fedc0333ccddb034` |

The stable address is the owner/topic pair, not the manifest. A later revision replaces the feed's reference while leaving those two public identifiers unchanged.

## Recovered collection

The independent recovery command resolved the feed and enumerated all files from the downloaded manifest:

| File | Bytes | Swarm reference |
| --- | ---: | --- |
| `folio-1.txt` | 23 | `811574edb0110591a697f9d4369e6f382cad55141296d9454f35e8f49a5e2936` |
| `folio-2.txt` | 23 | `fc9b5c1643351382fde431aded0fc26370e5f7ddb5d58c84485861eb235071a2` |
| `metadata.txt` | 45 | `706fb49f1460b1d851e77c6a190d35666967c77b9d816c762ac093cade306057` |

Reproduce with `npm run recover -- --bee http://localhost:1633`. The recovery process reads no private key, local state, or file index.

## Honest permanence statement

The node reads and displays the selected batch's remaining duration at each publish. Swarm availability remains a paid storage commitment: the collection is recoverable while its batch is funded and must be renewed before expiry.
