# Plan: Add Automated Import Sorting on Commit [IMPLEMENTED]

This plan outlines the steps required to implement automated import sorting during the git commit process using Husky and lint-staged.

## Rationale

Ensuring a consistent import order across the codebase improves readability, reduces merge conflicts, and maintains a clean code structure without manual effort.

## Tools

- **Husky**: To manage git hooks (specifically `pre-commit`).
- **lint-staged**: To run linters/formatters only on files that are being committed, improving performance.
- **eslint-plugin-simple-import-sort**: A popular and easy-to-configure ESLint plugin for strict import sorting.

## Proposed Steps

### 1. Install Dependencies

Install the necessary development dependencies:

```bash
npm install --save-dev lint-staged eslint-plugin-simple-import-sort
```

### 2. Configure ESLint

Update `eslint.config.cjs` to include the `simple-import-sort` plugin and define sorting rules.

**Add Plugin and Rules:**

```javascript
plugins: {
  // ... existing plugins
  "simple-import-sort": require("eslint-plugin-simple-import-sort"),
},
rules: {
  // ... existing rules
  "simple-import-sort/imports": "error",
  "simple-import-sort/exports": "error",
}
```

### 3. Configure lint-staged

Add a `lint-staged` configuration to `package.json` to run ESLint and Prettier on staged files.

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,css,md}": [
    "prettier --write"
  ]
}
```

### 4. Set Up Husky pre-commit Hook

Create or update the `pre-commit` hook to run `lint-staged`. For Husky v9, you can use:

```bash
echo "npx lint-staged" > .husky/pre-commit
chmod +x .husky/pre-commit
```

### 5. Verification

1. Modify a file with unsorted imports.
2. Stage the file: `git add <file>`.
3. Attempt to commit: `git commit -m "test import sort"`.
4. Verify that imports are sorted automatically and the commit succeeds.

## Timeline

- **Setup**: 15 minutes
- **Validation**: 5 minutes
