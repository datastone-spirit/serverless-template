import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { resolve } from "node:path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { TDesignResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig(() => {
	// 开发环境
	if (process.env.NODE_ENV === "development") {
		manifest.name = `开发：${manifest.name}`;
	}

	return {
		plugins: [
			vue(),
			crx({ manifest }),
			AutoImport({
				imports: ["vue", "vue-router"],
				resolvers: [
					TDesignResolver({
						library: "vue-next"
					})
				],
				dts: "types/auto-imports.d.ts",
				eslintrc: {
					enabled: true,
					filepath: "./.eslintrc-auto-import.cjs",
					globalsPropValue: true
				}
			}),
			Components({
				resolvers: [
					TDesignResolver({
						library: "vue-next"
					})
				],
				dts: "types/components.d.ts"
			})
		],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
				"@side-panel": fileURLToPath(new URL("./src/side-panel", import.meta.url))
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
					@use '@/styles/variables' as *;
					@use '@/styles/mixins' as *;
					`,
					// TODO: scss语法过旧警告
					silenceDeprecations: ["legacy-js-api"]
				}
			}
		},
		build: {
			outDir: "dist",
			rollupOptions: {
				input: {
					"side-panel": resolve(__dirname, "./src/side-panel/index.html")
				},
				output: {
					assetFileNames: "assets/[name]-[hash].[ext]", // 静态资源
					chunkFileNames: "js/[name]-[hash].js", // 代码分割中产生的 chunk
					entryFileNames: "js/[name]-[hash].js"
				}
			}
		}
	};
});
