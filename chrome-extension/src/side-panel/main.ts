/*
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:56:27
 * @LastEditTime: 2024-11-05 10:43:42
 * @LastEditors: mulingyuer
 * @Description: side-panel main
 * @FilePath: \chrome-extension\src\side-panel\main.ts
 * 怎么可能会有bug！！！
 */
import { createApp } from "vue";
import App from "./App.vue";
import pinia from "@side-panel/stores";
import router from "@side-panel/router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";

// style
import "normalize.css/normalize.css";
import "tdesign-vue-next/es/style/index.css"; // 引入组件库的少量全局样式变量
import "@/styles/index.scss";

const app = createApp(App);

// 插件
app.use(pinia);
app.use(autoAnimatePlugin);

// 路由
app.use(router);

// 挂载
app.mount("#app");
