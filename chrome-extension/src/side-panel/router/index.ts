/*
 * @Author: mulingyuer
 * @Date: 2024-11-05 09:42:25
 * @LastEditTime: 2024-11-05 09:59:45
 * @LastEditors: mulingyuer
 * @Description: 路由
 * @FilePath: \chrome-extension\src\side-panel\router\index.ts
 * 怎么可能会有bug！！！
 */
import { createWebHashHistory, createRouter } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
