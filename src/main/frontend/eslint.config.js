import pluginQuery from "@tanstack/eslint-plugin-query";

export default [
  {
    plugins: ["import", "@typescript-eslint"],
    rules: {
      "import/no-unresolved": "error",
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/typescript",
      "prettier",
    ],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
  },
  ...pluginQuery.configs["flat/recommended"],
];
