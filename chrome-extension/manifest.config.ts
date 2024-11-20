/*
 * @Author: mulingyuer
 * @Date: 2024-11-11 11:58:04
 * @LastEditTime: 2024-11-20 10:56:03
 * @LastEditors: mulingyuer
 * @Description: manifest 配置文件
 * @FilePath: \chrome-extension\manifest.config.ts
 * 怎么可能会有bug！！！
 */
import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

export default defineManifest(async (env) => {
	return {
		manifest_version: 3,
		name: env.mode === "production" ? packageJson.name : `[dev] ${packageJson.name}`,
		description: packageJson.description,
		version: packageJson.version,
		minimum_chrome_version: "116",
		icons: {
			"16": "images/icons/icon-16.png",
			"32": "images/icons/icon-32.png",
			"48": "images/icons/icon-48.png",
			"128": "images/icons/icon-128.png"
		},
		permissions: [
			"sidePanel",
			"storage",
			"nativeMessaging",
			"notifications",
			"contextMenus",
			"activeTab",
			"tabs",
			"scripting",
			"downloads"
		],
		background: {
			service_worker: "src/background/background.ts",
			type: "module"
		},
		action: {
			default_title: "点击打开测试工具"
		},
		side_panel: {
			default_path: "src/pages/side-panel/index.html"
		},
		web_accessible_resources: [
			{
				resources: [
					"images/notifications-icon/error.png",
					"images/notifications-icon/warning.png",
					"favicon.ico"
				],
				matches: ["<all_urls>"]
			}
		]
	};
});
