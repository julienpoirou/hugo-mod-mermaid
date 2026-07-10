# hugo-mod-mermaid

[![CI](https://github.com/julienpoirou/hugo-mod-mermaid/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/julienpoirou/hugo-mod-mermaid/actions/workflows/ci.yml)
[![CodeQL](https://github.com/julienpoirou/hugo-mod-mermaid/actions/workflows/codeql.yml/badge.svg)](https://github.com/julienpoirou/hugo-mod-mermaid/actions/workflows/codeql.yml)
[![Release](https://img.shields.io/github/v/release/julienpoirou/hugo-mod-mermaid?include_prereleases&sort=semver)](https://github.com/julienpoirou/hugo-mod-mermaid/releases)
[![Hugo Module](https://img.shields.io/badge/Hugo-Module-FF4088?logo=hugo&logoColor=white)](https://gohugo.io/hugo-modules/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196.svg)](https://www.conventionalcommits.org)

<p align="center">
  <img src="./logo.svg" alt="hugo-mod-mermaid logo" width="160" height="160">
</p>

Standalone Hugo module for Mermaid rendering with vendored Mermaid, ZenUML, and icon-pack assets.

## Features

- Render diagrams with `{{< mermaid >}}`
- Support `src`, `b64`, and inline body input modes
- Ship vendored Mermaid, ZenUML (opt-in), and icons
- Render with `securityLevel: strict` by default, loosened only on opt-in
- Initialize icon packs without inline config blocks in the page
- Fail explicitly at build time when shortcode source is missing

## Requirements

- Hugo `>= 0.124`
- A Hugo site with Hugo Modules enabled

## Installation

Import the module in your Hugo site:

```toml
[module]
  [[module.imports]]
    path = "github.com/julienpoirou/hugo-mod-mermaid"
```

## Usage

Inline source:

```text
{{< mermaid >}}
flowchart TD
  A[Start] --> B[Done]
{{< /mermaid >}}
```

File source:

```text
{{< mermaid src="renderers/mermaid.mmd" />}}
```

Base64 source (when the diagram text would otherwise conflict with Markdown
or shortcode parsing):

```text
{{< mermaid b64="Zmxvd2NoYXJ0IExSCiAgWCAtLT4gWQ==" />}}
```

## Security

Rendering runs with Mermaid `securityLevel: "strict"` **by default**: labels
are sanitized and raw HTML is disabled, so diagram source cannot inject
scripts. Only loosen this for diagrams you fully control, per page, via the
`security` param (`strict` | `loose` | `antiscript` | `sandbox`):

```text
{{< mermaid security="loose" >}}
flowchart TD
  A --> B
{{< /mermaid >}}
```

`mermaid.initialize` is page-global, so the first shortcode that sets a valid
`security` value determines the level for the whole page. Do not use `loose`
on pages that render untrusted diagram source.

## ZenUML (opt-in)

The ZenUML extension (~4.1 MB) is **not** loaded by default. Enable it per
shortcode for ZenUML diagrams:

```text
{{< mermaid zenuml="true" >}}
zenuml
  Alice->Bob: Hello
{{< /mermaid >}}
```

It is injected once per page, regardless of how many `zenuml="true"`
shortcodes appear.

## Output assets

The module publishes, through Hugo Pipes (`resources.Get` + `fingerprint`),
so each file's published URL includes a content hash for cache-busting and
ships a Subresource Integrity attribute (`icons.json` is fetched at runtime
via `fetch()` rather than a script/link tag, but is fingerprinted the same
way for the same cache-busting benefit):

- `vendor/hugo-mod-mermaid/mermaid.min.<hash>.js`
- `vendor/hugo-mod-mermaid/mermaid-zenuml.min.<hash>.js` (only when `zenuml="true"`)
- `vendor/hugo-mod-mermaid/icons.<hash>.json`
- `vendor/hugo-mod-mermaid/hugo-mod-mermaid.<hash>.js`
- `vendor/hugo-mod-mermaid/hugo-mod-mermaid.<hash>.css`

Source files live under `assets/vendor/hugo-mod-mermaid/` in this
repository; see [`VENDORED.md`](VENDORED.md) for their unfingerprinted
checksums.

## Development

```bash
git clone https://github.com/julienpoirou/hugo-mod-mermaid
cd hugo-mod-mermaid
```

The main verification is handled by GitHub Actions with a minimal Hugo site that mounts the module and builds a sample page.

## Contributing

- Use Conventional Commits for branch history
- Update docs or changelog when behavior changes
- Keep Mermaid examples valid across current Mermaid runtime versions
- See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) for contribution guidance
