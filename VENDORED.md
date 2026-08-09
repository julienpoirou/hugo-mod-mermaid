# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table, and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-mermaid/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `mermaid.min.js` | [Mermaid](https://github.com/mermaid-js/mermaid) | 11.12.0 | MIT | `07e37dfa97b337ccc85365d57eddf99b9706f09db3b59b260d0333b23b343c4b` |
| `mermaid-zenuml.min.js` | [@mermaid-js/mermaid-zenuml](https://github.com/mermaid-js/mermaid) | 0.2.x | MIT | `e9ae30fea40757cf9346ffd01cae93e5607dabf136375f20820f11d30030c061` |
| `icons.json` | [SVG Logos](https://github.com/gilbarbara/logos) (via @iconify-json/logos) | latest at vendoring | CC0-1.0 | `ba3397c6499ca7d7476e21d8e83b56b4f217c6a959b5e80efd2e832d7c444d03` |

Sources, all under `https://cdn.jsdelivr.net/npm/`: `mermaid@11.12.0/dist/mermaid.min.js`, `@mermaid-js/mermaid-zenuml/dist/mermaid-zenuml.esm.min.mjs`, `@iconify-json/logos/icons.json`.

First-party files, under this repository's [LICENSE](LICENSE): `hugo-mod-mermaid.js`, `hugo-mod-mermaid.css`.

## Verifying integrity

```bash
sha256sum assets/libs/hugo-mod-mermaid/mermaid.min.js
sha256sum assets/libs/hugo-mod-mermaid/mermaid-zenuml.min.js
sha256sum assets/libs/hugo-mod-mermaid/icons.json
```
