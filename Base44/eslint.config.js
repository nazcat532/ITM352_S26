import globals from "globals";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  // Base JS recommended rules
  js.configs.recommended,

  // React recommended rules
  react.configs.flat.recommended,

  {
    files: ["src/**/*.{js,jsx,mjs,cjs}"],

    ignores: ["src/lib/**/*", "src/components/ui/**/*"],

    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2022,
      sourceType: "module",
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "unused-imports": unusedImports,
    },

    rules: {
      // 🔥 Clean code rules
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "off",

      // Hooks safety (VERY important)
      "react-hooks/rules-of-hooks": "error",

      // Allow custom DOM attributes (your UI libs)
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["cmdk-input-wrapper", "toast-close"],
        },
      ],
    },
  },
];