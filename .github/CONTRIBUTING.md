# Contributing

Thanks for your interest in **hugo-mod-mermaid**.

## Prerequisites
- Hugo 0.159+
- Go 1.22+ for Hugo module metadata

## Getting started
```bash
git clone https://github.com/julienpoirou/hugo-mod-mermaid
cd hugo-mod-mermaid
```

The main verification runs in GitHub Actions by building a minimal Hugo site that mounts this module.

## Branches & commits
- Branch off `main`: `feat/x`, `fix/y`, etc.
- **Conventional Commits** required:
  - `feat(scope): ...` (minor)
  - `fix(scope): ...` (patch)
  - `feat!(scope): ...` or `refactor!: ...` (major)
- CI enforces the format via **commitlint**.

## Tests
- Run the CI-equivalent by mounting the module in a minimal Hugo site
- Keep `README.md` and `CHANGELOG.md` aligned with behavior changes

## Open a PR
- Fill the PR template.
- Checklist: CI green, docs updated if needed, changelog updated when appropriate.

## Discussion
- Questions: issues or discussions.
- First contributions welcome: **good first issue** label.
