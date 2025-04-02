import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import vueParser from "vue-eslint-parser";

export default defineConfig([
  {
    ignores: [
      "node_modules",
      ".output",
      ".vscode",
      ".idea",
      ".nuxt",
      "components/ui",
      "eslint.config.js",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-inferrable-types": "error",
    },
  },
  {
    rules: {
      "semi": ["error", "always"], // Требуем точку с запятой
      "no-console": "warn", // Предупреждение за console.log
      "no-debugger": "error", // Запрещаем debugger
    },
  },
  {
    languageOptions: {
      parser: tsParser, // Используем парсер для TypeScript
      parserOptions: {
        ecmaVersion: "latest",
      },
      globals: {
        window: "readonly",
        document: "readonly",
        Node: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // Указываем плагин как объект
    },
    rules: {
      "semi": ["error", "always"],
      "no-console": "warn",
      "no-debugger": "error",
      "eqeqeq": "error",
      "prefer-const": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"], // Настройки для TypeScript файлов
    languageOptions: {
      parser: tsParser, // Используем парсер для TypeScript
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off", // Отключаем требование явных типов на границах модулей
      "@typescript-eslint/strict-boolean-expressions": "off", // Предупреждение о неявных проверках boolean
    },
  },
  {
    files: ["**/*.vue"], // Применяем для всех Vue файлов
    languageOptions: {
      parser: vueParser, // Используем vue-eslint-parser для файлов .vue
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin, // Указываем плагин для TypeScript в Vue
    },
    rules: {
      // Ваши специфичные правила для Vue, если нужно
      "vue/max-attributes-per-line": "off", // Пример настройки для Vue
    },
  },
]);
