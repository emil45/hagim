# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production (static export to out/)
npm run lint         # Run ESLint
npm test             # Run all e2e tests
npm run test:ui      # Run tests with interactive UI
npm run test:headed  # Run tests with browser visible
```

## Architecture

This is a multi-locale Next.js 16 app with static export, serving a Jewish holidays guide at hagim.online.

### Internationalization
- **Locales**: Hebrew (he, default), English (en), Russian (ru)
- **Routing**: `localePrefix: "as-needed"` means Hebrew uses `/`, others use `/en`, `/ru`
- **Direction**: Hebrew is RTL, others are LTR (set via `dir` attribute on `<html>`)
- **Translations**: `src/messages/{he,en,ru}.json` with `next-intl`

### Key Patterns
- Pages use `generateStaticParams()` to generate all locale variants
- Use `setRequestLocale(locale)` at the start of async page components
- Use `getLocalizedPath(path, locale)` from `src/lib/locale.ts` for internal links
- Tribe data is split by origin: `tribeEastData.ts`, `tribeAshkenazData.ts`, etc.

### Static Export
The app builds to `out/` directory. No server-side features (API routes, middleware) are available. The `proxy.ts` file handles locale routing at the edge.
