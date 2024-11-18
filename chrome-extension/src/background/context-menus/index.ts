/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 15:22:41
 * @LastEditTime: 2024-11-18 10:37:10
 * @LastEditors: mulingyuer
 * @Description: 上下文菜单
 * @FilePath: \chrome-extension\src\background\context-menus\index.ts
 * 怎么可能会有bug！！！
 */
import { chromeContextMenu } from "@/utils/chrome-context-menus";
import { chromeMessage, EventName } from "@/utils/chrome-message";
import { ContextMenuEnum } from "./strategy/context-menu-enum";
import { generateMensListStrategy } from "./strategy/generate-mens-list-strategy";
export * from "./strategy/context-menu-enum";

export class ContextMenus {
	private isInit = false;

	/** 初始化 */
	public init() {
		if (this.isInit) return;
		this.watchCreateMenus();
		this.watchCloseMenus();
		this.isInit = true;
	}

	/** 监听创建菜单事件 */
	private watchCreateMenus() {
		chromeMessage.on(EventName.CREATE_CONTEXT_MENUS, (message) => {
			const data = message.data as ContextMenuEnum;
			if (!data) return;

			const strategy = generateMensListStrategy[data];
			if (typeof strategy !== "function") return;

			// 清除之前的菜单
			chromeContextMenu.removeAll();

			// 从策略中取得菜单列表数据并创建菜单
			const menuList = strategy();
			menuList.forEach((item) => {
				chromeContextMenu.create(item);
			});
		});
	}

	/** 监听关闭菜单事件 */
	private watchCloseMenus() {
		chromeMessage.on(EventName.CLOSE_CONTEXT_MENUS, () => {
			chromeContextMenu.removeAll();
		});
	}
}

export const contextMenus = new ContextMenus();
