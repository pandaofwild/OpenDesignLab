# Security Policy

## Supported versions

The latest code on the default development branch is supported.

## Reporting a vulnerability

Please report security issues through GitHub security advisories if available, or open an issue with a minimal description that does not expose exploit details publicly.

Include:

- The affected route, component, or script.
- Steps to reproduce.
- Impact and any known workaround.

## Secrets and local image generation

The image generation route uses `OPENAI_API_KEY` only for local administrator workflows. Do not commit real API keys. Use `.env.local` for local secrets and `.env.example` for documented placeholders.
