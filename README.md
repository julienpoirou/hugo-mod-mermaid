# hugo-mod-mermaid

[![CI](https://github.com/julienpoirou/hugo-mod-mermaid/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-mermaid/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-mermaid/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-mermaid/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/julienpoirou/hugo-mod-mermaid/badge)](https://scorecard.dev/viewer/?uri=github.com/julienpoirou/hugo-mod-mermaid)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-mermaid?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-mermaid/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-mermaid logo" width="160" height="160">
</p>

<p align="center">
  <strong>Mermaid diagrams in your Hugo pages.</strong><br>
  One shortcode, vendored Mermaid, ZenUML and icon packs, strict sanitizing by default.
</p>

## Requires

- Hugo >= `0.124`. The extended edition is not required.

## Install

**Binary** - Hugo and Go installed locally:

```bash
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-mermaid
```

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-mermaid"
```

**Container** - Docker installed locally:

```bash
alias hugo='docker run --rm -v "$PWD":/src -p 1313:1313 hugomods/hugo:go-git hugo'
hugo mod init example.com/my-site
hugo mod get github.com/julienpoirou/hugo-mod-mermaid
```

## Usage

**Shortcode** - Raw diagram source between the tags:

```text
{{< mermaid >}}
flowchart TD
  A[Write Markdown] --> B[hugo build]
  B --> C[SVG in the browser]
{{< /mermaid >}}
```

**Self-closing shortcode** - Source read from a file:

```text
{{< mermaid src="renderers/mermaid.mmd" />}}
```

**Self-closing shortcode** - Source passed as base64:

```text
{{< mermaid b64="Zmxvd2NoYXJ0IExSCiAgWCAtLT4gWQ==" />}}
```

### Parameters

| Param | Default | Description |
|---|---|---|
| inner content | - | Raw diagram source between the opening and closing tags |
| `src` | - | Path, relative to `assets/`, of a file holding the diagram source |
| `b64` | - | Base64-encoded diagram source |
| `security` | `strict` | Mermaid security level: `strict`, `loose`, `antiscript`, `sandbox` |
| `zenuml` | `false` | Load the ZenUML extension for ZenUML diagrams |

> At least one source input is required. If several are given, `b64` wins over `src`, and `src` wins over the inner content, the others are ignored silently.

> A missing or empty source fails the build with an explicit error rather than emitting a blank page. A syntax error in the diagram is not caught at build time: it surfaces at render time, as Mermaid's message in place of the diagram.

> `src` is resolved with `readFile` from the project root, so the file must live in your own site's `assets/`. A file mounted from a theme or from another module will not be found.

## Security

Rendering runs with Mermaid `securityLevel: "strict"` by default: labels are sanitized and raw HTML is disabled, so diagram source cannot inject scripts. `mermaid.initialize` is page-global, so the first shortcode setting a valid `security` value decides the level for the whole page. Only loosen it on pages whose diagrams you fully control.

```text
{{< mermaid security="loose" >}}
flowchart TD
  A --> B
{{< /mermaid >}}
```

An unrecognized value falls back to `strict` rather than failing, so a typo can never silently weaken a page.

## ZenUML (opt-in)

The ZenUML extension is not loaded by default, and is injected once per page however many shortcodes ask for it:

```text
{{< mermaid zenuml="true" >}}
zenuml
  Alice->Bob: Hello
{{< /mermaid >}}
```

## Rendering

The diagram is rendered in the reader's browser to inline `<svg>`. Flowcharts and sequence diagrams use `useMaxWidth: true`, so they scale down to their container, and sequence diagrams carry step numbers.

- The stylesheet and both scripts are injected once per page, at the first `mermaid` shortcode, in the flow of the content, not in `<head>`. Each one is fingerprinted and carries a Subresource Integrity hash.
- `mermaid.initialize` runs once per page with `startOnLoad: false`, so this module drives every render itself. Raw HTML labels are enabled only under `security="loose"`.
- The `logos` icon pack is registered through a loader pointing at a fingerprinted `icons.json`, with no inline configuration block in the page, so a strict Content-Security-Policy without `'unsafe-inline'` still works. The file is published on any page using the shortcode but only downloaded when a diagram actually references a `logos:` icon.
- For diagrams injected after page load, call `window.HugoModMermaid.renderAll(root)`.
- Without JavaScript the shortcode leaves an empty block: there is no server-side fallback.

## Vendored assets

Mermaid `11.12.0` (2.7 MB), the opt-in ZenUML extension `0.2.x` (4.1 MB) and the `logos` icon set (7.0 MB, CC0) ship inside the module, no CDN, no third-party request at page load. Provenance, licenses and SHA-256 are recorded in [VENDORED.md](VENDORED.md).

## License

MIT © 2025 [Julien Poirou](mailto:julienpoirou@protonmail.com)
