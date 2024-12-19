import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Target all JavaScript and TypeScript files
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // Add browser globals
        process: "readonly", // Add process as a global
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "no-unused-vars": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-undef": "error",
      "@typescript-eslint/no-unused-vars": "error", // TypeScript rule for unused variables
    },
  },
  // Extend configurations
  pluginJs.configs.recommended, // ESLint's recommended rules
  ...tseslint.configs.recommended, // TypeScript ESLint recommended rules
  prettier, // Prettier integration
  {
    ignores: ["node_modules/", "dist/"], // Ignore folders
  },
];
