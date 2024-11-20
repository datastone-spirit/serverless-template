import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
import defineManifest from "./manifest.config";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { TDesignResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		crx({ manifest: defineManifest }),
		AutoImport({
			imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
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
			"@side-panel": fileURLToPath(new URL("./src/pages/side-panel", import.meta.url))
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
	// HACK: https://github.com/crxjs/chrome-extension-tools/issues/696
	server: {
		port: 5173,
		strictPort: true,
		hmr: {
			port: 5173
		}
	},
	build: {
		rollupOptions: {
			input: {
				"side-panel": "src/pages/side-panel/index.html",
				"image-preview": "src/pages/image-preview/index.html"
			},
			output: {
				assetFileNames: "assets/[name]-[hash].[ext]", // 静态资源
				chunkFileNames: "js/[name]-[hash].js", // 代码分割中产生的 chunk
				entryFileNames: "js/[name]-[hash].js"
			}
		}
	}
});
