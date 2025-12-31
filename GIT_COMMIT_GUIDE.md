# How to Commit Changes to Git

## Current Status

You have the following changes:

1. **Modified file**: `frontend/src/components/Auth.jsx` (validation fix)
2. **New React files** (if not already committed):
   - All React components in `frontend/src/`
   - `frontend/package.json`
   - `frontend/vite.config.js`
   - `frontend/index.html`

## Step-by-Step Guide to Commit

### 1. Check what files have changed:
```bash
git status
```

### 2. See the actual changes in Auth.jsx:
```bash
git diff frontend/src/components/Auth.jsx
```

### 3. Stage the modified file:
```bash
git add frontend/src/components/Auth.jsx
```

### 4. If you want to add ALL frontend changes (including new React files):
```bash
git add frontend/
```

### 5. Check what will be committed:
```bash
git status
```

### 6. Commit the changes:
```bash
git commit -m "Fix: Replace browser HTML5 validation with custom validation in Auth form

- Added noValidate attribute to prevent browser validation popups
- Implemented custom validation with clear error messages
- Added email regex validation
- Improved user experience with toast notifications instead of browser alerts"
```

### 7. Push to remote repository (if you have one):
```bash
git push origin main
```

## Quick One-Line Commands

### Commit only the Auth.jsx fix:
```bash
git add frontend/src/components/Auth.jsx && git commit -m "Fix form validation error in signup form"
```

### Commit all frontend changes:
```bash
git add frontend/ && git commit -m "Convert frontend to React with Hooks and fix validation"
```

## What NOT to Commit

These files should be ignored (already in .gitignore):
- `node_modules/` - Dependencies (should be in .gitignore)
- `.npm-cache/` - NPM cache files
- `dist/` or `build/` - Build output

## Verify Your .gitignore

Make sure your `.gitignore` includes:
```
node_modules/
.npm-cache/
dist/
build/
.env
*.log
```

## View Changes Before Committing

To see exactly what changed in Auth.jsx:
```bash
git diff frontend/src/components/Auth.jsx
```

This will show:
- Lines removed (marked with `-`)
- Lines added (marked with `+`)

## Example Git Workflow

```bash
# 1. Check status
git status

# 2. Stage the file
git add frontend/src/components/Auth.jsx

# 3. Commit with message
git commit -m "Fix: Custom validation for signup form to prevent browser validation errors"

# 4. Push (if you have remote)
git push
```

## If You Want to Undo Changes

### Undo changes to a file (before staging):
```bash
git restore frontend/src/components/Auth.jsx
```

### Unstage a file (after git add):
```bash
git restore --staged frontend/src/components/Auth.jsx
```

### See commit history:
```bash
git log --oneline
```

