import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
    },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,jsx}"],
    ...pluginReact.configs.flat.recommended,
    rules: {
      ...pluginReact.configs.flat.recommended.rules,

      "react/prop-types": "off",

      "react/react-in-jsx-scope": "off",
    },
  },
]);
