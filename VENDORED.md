# Vendored third-party assets

Provenance and integrity of every third-party file shipped by this module. When updating a library: replace the file, update this table and the matching `sha256` in [.vendored/package.json](.vendored/package.json), and update [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) if the upstream license changed.

All files live in `assets/libs/hugo-mod-mermaid/`.

| File | Library | Version | License | SHA-256 |
|---|---|---|---|---|
| `mermaid.min.js` | [Mermaid](https://github.com/mermaid-js/mermaid) | 11.16.1 | MIT | `18327bef70d96fb505fe7287d9f6a7362ebf07ff6576ddfaffb1a06f3e1a2954` |
| `mermaid-zenuml.min.js` | [@mermaid-js/mermaid-zenuml](https://github.com/mermaid-js/mermaid) | 0.2.3 | MIT | `9c909136299b14c7c890facebd348e8fdf0de804d14a1a9c0b8a422caee8e4e4` |
| `icons.json` | [SVG Logos](https://github.com/gilbarbara/logos) (via @iconify-json/logos) | 1.2.12 | CC0-1.0 | `09198ad7e85796fb49b8d70425c35051c17e54131889262eaf25dbaf06d6eab8` |

Sources: `https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.min.js`, `https://cdn.jsdelivr.net/npm/@mermaid-js/mermaid-zenuml@0.2.3/dist/mermaid-zenuml.min.js`, `https://cdn.jsdelivr.net/npm/@iconify-json/logos@1.2.12/icons.json`.

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
