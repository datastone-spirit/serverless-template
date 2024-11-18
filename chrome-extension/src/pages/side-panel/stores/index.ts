/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 09:10:27
 * @LastEditTime: 2024-10-31 11:33:18
 * @LastEditors: mulingyuer
 * @Description: 数据模块
 * @FilePath: \serverless-api-tester\src\side-panel\stores\index.ts
 * 怎么可能会有bug！！！
 */
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();

// 持久化
pinia.use(piniaPluginPersistedstate);

export { pinia };
export * from "./modules";
export default pinia;
