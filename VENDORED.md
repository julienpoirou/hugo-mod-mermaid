# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table and the matching `sha256` in [.vendored/package.json](.vendored/package.json), and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-mermaid/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `mermaid.min.js` | [Mermaid](https://github.com/mermaid-js/mermaid) | 12.2.0 | MIT | `a8a6a6f805b074a8261a2825c86f99c8054acb3b35f50bb7e24a4f9f2c3c3b9f` |
| `mermaid-zenuml.min.js` | [@mermaid-js/mermaid-zenuml](https://github.com/mermaid-js/mermaid) | 1.0.1 | MIT | `4dad6128f9a4d8451a4b322fd94fd9e0516ac28cfc470bfc5a4f3b371b8f0a9d` |
| `icons.json` | [SVG Logos](https://github.com/gilbarbara/logos) (via @iconify-json/logos) | 1.2.18 | CC0-1.0 | `8935ffe6f148e157c281330bcab7387f32b4449094f4db3d3ca9e42d4328b7a3` |

Sources: `https://cdn.jsdelivr.net/npm/mermaid@12.2.0/dist/mermaid.min.js`, `https://cdn.jsdelivr.net/npm/@mermaid-js/mermaid-zenuml@1.0.1/dist/mermaid-zenuml.min.js`, `https://cdn.jsdelivr.net/npm/@iconify-json/logos@1.2.18/icons.json`.

`mermaid-zenuml.min.js` is not a pristine upstream file, which is why its checksum matches nothing published as-is. Two edits turn `dist/mermaid-zenuml.min.js` into the vendored copy, and re-applying them is part of updating it:

1. Drop the leading `"use strict";`.
2. Append `window.zenuml = globalThis["mermaid-zenuml"]` and keep the `// NOTE 需移除 use strict 并添加全局变量 zenuml` header line at the top.

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
