# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module.
When updating a library, replace the file, update this table, and update
`THIRD_PARTY_LICENSES.md` if the upstream license changed.

| File | Library | Version | Source | License | SHA-256 |
|---|---|---|---|---|---|
| `static/vendor/hugo-mod-mermaid/mermaid.min.js` | [Mermaid](https://github.com/mermaid-js/mermaid) | 11.12.0 | `https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.min.js` | MIT | `07e37dfa97b337ccc85365d57eddf99b9706f09db3b59b260d0333b23b343c4b` |
| `static/vendor/hugo-mod-mermaid/mermaid-zenuml.min.js` | [@mermaid-js/mermaid-zenuml](https://github.com/mermaid-js/mermaid) | 0.2.x | `https://cdn.jsdelivr.net/npm/@mermaid-js/mermaid-zenuml/dist/mermaid-zenuml.esm.min.mjs` | MIT | `e9ae30fea40757cf9346ffd01cae93e5607dabf136375f20820f11d30030c061` |
| `static/vendor/hugo-mod-mermaid/icons.json` | [@iconify-json/logos](https://github.com/iconify/icon-sets) | latest at vendoring | `https://cdn.jsdelivr.net/npm/@iconify-json/logos/icons.json` | MIT (icon-set metadata; individual logos remain under their own marks) | `ba3397c6499ca7d7476e21d8e83b56b4f217c6a959b5e80efd2e832d7c444d03` |

First-party files (not covered above): `static/vendor/hugo-mod-mermaid/hugo-mod-mermaid.js`,
`static/vendor/hugo-mod-mermaid/hugo-mod-mermaid.css` — licensed under this
repository's [LICENSE](LICENSE).

## Asset sizes

These bundles are large; keep them in mind when importing the module:

- `mermaid.min.js` ~2.7 MB
- `mermaid-zenuml.min.js` ~4.1 MB (**opt-in**, see README)
- `icons.json` ~7.0 MB (loaded lazily via `fetch`, only when the runtime
  initializes)

## Verifying integrity

```bash
sha256sum static/vendor/hugo-mod-mermaid/mermaid.min.js
sha256sum static/vendor/hugo-mod-mermaid/mermaid-zenuml.min.js
sha256sum static/vendor/hugo-mod-mermaid/icons.json
```
