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
- Ship vendored Mermaid, ZenUML, and icons
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

## Output assets

The module publishes:

- `vendor/hugo-mod-mermaid/mermaid.min.js`
- `vendor/hugo-mod-mermaid/mermaid-zenuml.min.js`
- `vendor/hugo-mod-mermaid/icons.json`
- `vendor/hugo-mod-mermaid/hugo-mod-mermaid.js`
- `vendor/hugo-mod-mermaid/hugo-mod-mermaid.css`

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
