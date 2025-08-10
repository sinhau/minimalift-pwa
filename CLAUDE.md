# Context for Claude Code

For broader project context, technical specifications, and implementation details, refer to:

- **docs/project_plan.md** - Complete technical specification, data model, tech stack, and execution plan
- **docs/The Minimalift Manual.pdf** - Exercise descriptions and program details  
- **docs/Minimalift 3 Day.pdf** - Program structure and workout format

## Quick Reference
- **Goal**: Offline-first iPhone PWA for Minimalift 3-Day strength program
- **Tech**: Vanilla TypeScript + Vite + Web Components + IndexedDB
- **Features**: Timers (EMOM/N90), exercise logging, video demos, offline support

## Workflow
- **Always commit and push changes** after making any modifications to the codebase
- **PWA Cache Updates**: The service worker cache version is now auto-generated using timestamps during `npm run build` to ensure every build creates a new cache version for proper PWA updates