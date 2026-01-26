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

## Development Workflow

```
EXPLORE → PLAN → IMPLEMENT → REVIEW → TEST → SHIP
```

### Explore
Before coding, launch Explore agents to find similar features, files to change, and existing utilities to reuse.

### Implement
1. Follow existing patterns in the codebase
2. Add UI translations to `src/messages/{he,en,ru}.json` for any user-facing text
3. Run `npm run build` - fix ALL errors before proceeding

### Review
Run pr-review-toolkit agents sequentially, scoped to files you modified:

1. **code-reviewer**: "Review changes to [files]. Focus on bugs, logic errors, guideline violations."
2. **silent-failure-hunter**: "Review error handling in [files] for silent failures."
3. **code-simplifier**: "Review [files] for unnecessary complexity."

Fix issues and re-run `npm run build` after.

### Test
Run `npm test`. If failures occur in files you modified, fix them. Pre-existing failures in unrelated files can be noted and skipped.

### Ship
```bash
git add <specific-files>
git commit -m "<type>(<scope>): <description>"
git push
```

## Anti-Patterns

- Coding before exploring codebase
- Creating files when editing existing works
- Skipping reviews "because it's small"
- Running review agents on entire codebase instead of scoping to changed files
- Committing without tests passing
- Forgetting UI translations for new text

## When Stuck

After 3 failed attempts, ask for help:
```
I'm stuck on [issue].

Tried:
1. [attempt]
2. [attempt]
3. [attempt]

Error: [specific error]

Options:
- [A]
- [B]

Which approach?
```
