/*
 * @Author: mulingyuer
 * @Date: 2024-11-05 09:42:57
 * @LastEditTime: 2024-11-05 16:02:14
 * @LastEditors: mulingyuer
 * @Description: 路由
 * @FilePath: \chrome-extension\src\side-panel\router\routes.ts
 * 怎么可能会有bug！！！
 */
import type { RouteRecordRaw } from "vue-router";
import NavBarLayout from "@side-panel/layout/nav-bar-layout.vue";
import BlankLayout from "@side-panel/layout/blank-layout.vue";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: BlankLayout,
		children: [
			{
				path: "",
				name: "Home",
				component: () => import("@side-panel/views/home/index.vue")
			}
		]
	},
	{
		path: "/serverless",
		component: NavBarLayout,
		children: [
			{
				path: "/serverless/serverless-comfyui",
				name: "ServerlessComfyUI",
				component: () => import("@side-panel/views/serverless-comfyui/index.vue")
			},
			{
				path: "/serverless/sdxl-text2img",
				name: "ServerlessSDXLText2Img",
				component: () => import("@side-panel/views/sdxl-text2img/index.vue")
			}
		]
	}
];
