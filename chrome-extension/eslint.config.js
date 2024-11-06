import pluginVue from "eslint-plugin-vue";
import vueTsEslintConfig from "@vue/eslint-config-typescript";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import AutoImport from "./.eslintrc-auto-import.cjs";

export default [
	{
		name: "app/files-to-lint",
		files: ["**/*.{ts,mts,tsx,vue}"]
	},

	{
		name: "app/files-to-ignore",
		ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]
	},
	{
		ignores: [
			".vscode",
			"node_modules",
			"*.md",
			"*.woff",
			"*.ttf",
			".idea",
			"dist",
			".husky",
			"serverless-demo"
		],
		files: ["**/*.{js,ts,mjs,mts,cjs,cts,jsx,tsx,vue}"],
		languageOptions: {
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...AutoImport.globals
			}
		}
	},
	...pluginVue.configs["flat/essential"],
	...vueTsEslintConfig(),
	skipFormatting,
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"vue/multi-word-component-names": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_"
				}
			]
		}
	}
];
