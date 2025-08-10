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

### Pre-Commit Checklist (MANDATORY)
**ALWAYS follow these steps in order before committing ANY changes:**

1. **🏗️ Build Verification** 
   ```bash
   npm run build
   ```
   - Must compile without errors

2. **🚀 Commit & Push**
   ```bash
   git add .
   git commit -m "descriptive message"
   git push
   ```

**If the build fails, fix the issues and restart from step 1.**

### Development Notes
- **PWA Cache Updates**: Service worker cache version is auto-generated using timestamps during `npm run build` to ensure every build creates a new cache version for proper PWA updates
- **Safe Session Testing**: Use save/discard dialog to test workout sessions without corrupting data