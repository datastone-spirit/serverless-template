/*
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:44:12
 * @LastEditTime: 2024-11-05 11:31:42
 * @LastEditors: mulingyuer
 * @Description: 背景脚本
 * @FilePath: \chrome-extension\src\background\background.ts
 * 怎么可能会有bug！！！
 */
import { contextMenus } from "./context-menus";
import { tabs } from "./tabs";

/** 初始化侧边栏 */
function initSidePanel() {
	// 点击侧边栏按钮打开侧边栏
	chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
}

/** 插件安装 */
chrome.runtime.onInstalled.addListener(async () => {
	// 初始化侧边栏
	initSidePanel();
	// 初始化菜单
	contextMenus.init();
	// 初始化tabs
	tabs.init();
});

/** 插件启用 */
chrome.runtime.onStartup.addListener(async () => {
	// 初始化侧边栏
	initSidePanel();
	// 初始化菜单
	contextMenus.init();
	// 初始化tabs
	tabs.init();
});
