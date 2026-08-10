# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table and the matching `sha256` in [.vendored/package.json](.vendored/package.json), and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-mermaid/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `mermaid.min.js` | [Mermaid](https://github.com/mermaid-js/mermaid) | 11.12.0 | MIT | `07e37dfa97b337ccc85365d57eddf99b9706f09db3b59b260d0333b23b343c4b` |
| `mermaid-zenuml.min.js` | [@mermaid-js/mermaid-zenuml](https://github.com/mermaid-js/mermaid) | 0.2.2 | MIT | `e9ae30fea40757cf9346ffd01cae93e5607dabf136375f20820f11d30030c061` |
| `icons.json` | [SVG Logos](https://github.com/gilbarbara/logos) (via @iconify-json/logos) | 1.2.10 | CC0-1.0 | `ba3397c6499ca7d7476e21d8e83b56b4f217c6a959b5e80efd2e832d7c444d03` |

Sources: `https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.min.js`, `https://www.npmjs.com/package/@mermaid-js/mermaid-zenuml/v/0.2.2`, `https://cdn.jsdelivr.net/npm/@iconify-json/logos@1.2.10/icons.json`.

`mermaid-zenuml.min.js` is not a pristine upstream file. It is the package's `esm.min` chunk, patched to drop the use-strict prologue and to expose `window.zenuml`, which is why its checksum matches nothing published as-is. Re-applying that patch is part of updating it.

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-mermaid.js`, `hugo-mod-mermaid.css`.

## How updates reach us

[.vendored/package.json](.vendored/package.json) pins the same versions as ordinary npm dependencies. Nothing ever installs it. It exists so Dependabot opens a pull request when one of these libraries releases, and so GitHub raises a security alert against the exact code this module serves to readers.

Dependabot can bump that manifest but cannot re-download a minified bundle, so a merged bump would otherwise leave the declared version and the shipped bytes silently out of sync. `scripts/check-vendored.mjs` closes that gap: it fails the build unless the pinned version, this table and the checksum of the committed file all agree.

## Verifying integrity

```bash
node scripts/check-vendored.mjs
sha256sum assets/libs/hugo-mod-mermaid/mermaid.min.js
sha256sum assets/libs/hugo-mod-mermaid/mermaid-zenuml.min.js
sha256sum assets/libs/hugo-mod-mermaid/icons.json
```
