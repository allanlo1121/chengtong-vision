import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // --- JS Recommended Rules ---
  js.configs.recommended,

  // --- TS + Project-wide rules ---
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ignores: [
      "**/*.md",
      "node_modules",
      "dist",
      ".turbo",
      "apps/frontend/.next",
      "apps/backend/dist",
      "packages/core/supabaseTypes.ts", // 忽略大型自动生成文件
    ],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly", // ⬅️ 解决 console is not defined
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // --- prettier integration ---
      "prettier/prettier": "error",

      // --- TS rules ---
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Allow unused vars in supabase types
      "no-unused-vars": "off",

      // Allow console in backend
      "no-undef": "off",
    },
  },
];
