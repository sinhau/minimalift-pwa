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

1. **📝 Add New Tests (if needed)**
   - If you added new functions, components, or significant logic
   - If you modified existing functionality that isn't well covered

2. **🧪 Run Unit Tests**
   ```bash
   npm run test:run
   ```
   - Fix any failing tests before proceeding
   - All tests must pass to continue

3. **🏗️ Build Verification** 
   ```bash
   npm run build
   ```
   - Must compile without errors
   - If build fails, fix issues and repeat steps 1-3

4. **🚀 Commit & Push**
   ```bash
   git add .
   git commit -m "descriptive message"
   git push
   ```

**If ANY step fails, fix the issues and restart from step 1.**

### Development Notes
- **PWA Cache Updates**: Service worker cache version is auto-generated using timestamps during `npm run build` to ensure every build creates a new cache version for proper PWA updates
- **Testing Framework**: Vitest with comprehensive mocks for IndexedDB and timer functionality
- **Safe Session Testing**: Use save/discard dialog to test workout sessions without corrupting data