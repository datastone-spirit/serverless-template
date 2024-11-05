/*
 * @Author: mulingyuer
 * @Date: 2024-11-05 09:42:57
 * @LastEditTime: 2024-11-05 09:59:50
 * @LastEditors: mulingyuer
 * @Description: 路由
 * @FilePath: \chrome-extension\src\side-panel\router\routes.ts
 * 怎么可能会有bug！！！
 */
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Home",
		component: () => import("@side-panel/views/home/index.vue")
	},
	{
		path: "/serverless-comfyui",
		name: "ServerlessComfyUI",
		component: () => import("@side-panel/views/serverless-comfyui/index.vue")
	}
];
