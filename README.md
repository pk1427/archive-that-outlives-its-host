# Spiti archive publisher

This is a content-addressed archive with a stable Swarm feed as its public address. The feed contains a reference to an uploaded collection manifest; the manifest names every separately uploaded folio and carries collection provenance/preservation metadata. That is why a reader needs only the public owner/topic pair in `archive-identifiers.json`, not this application or its disk. See [live publication evidence](LIVE-PUBLICATION.md) for a real published collection and recovery result.

## Publish

Start a funded Bee/Swarm Desktop node in light mode, set `FEED_PRIVATE_KEY` and `POSTAGE_BATCH_ID` in a local `.env`, then run `npm run identity` and replace `feedOwner` in `archive-identifiers.json` with the printed public address before committing it. Then run `npm run publish -- ./folios`.

The command reads the batch TTL from the node and prints it. Storage is paid only until that TTL; it is not an eternal guarantee.

## Independent recovery

Anyone can run `npm run recover -- --bee http://localhost:1633` using only the tracked public identifiers. It reads the current feed, obtains the manifest reference, and downloads all folios. No publisher credentials or local index are used.
