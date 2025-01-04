/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  {
    files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: require("@typescript-eslint/parser"), // Correctly import the TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: require("eslint-plugin-react"),
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      import: require("eslint-plugin-import"),
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "testing-library/no-node-access": "off",
      "react/react-in-jsx-scope": "off", // React 17+ no longer requires React in scope
      "react/prop-types": "off", // Disable prop-types in TypeScript projects
      "import/no-unresolved": "off", // Disable unresolved imports errors
    },
  },
];
