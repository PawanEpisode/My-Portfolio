import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  globalIgnores([
    "dist",
    "node_modules",
    ".next",
    "coverage",
    "build",
    "supabase/.temp",
  ]),
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  {
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-page-custom-font": "off",
    },
  },
  {
    files: [
      "eslint.config.js",
      "next.config.ts",
      "postcss.config.mjs",
      "*.config.js",
      "*.config.mjs",
    ],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^[A-Z_]",
        },
      ],
    },
  },
  {
    files: ["**/shared/components/ui/**", "**/shared/theme/ThemeProvider.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  eslintConfigPrettier,
]);
