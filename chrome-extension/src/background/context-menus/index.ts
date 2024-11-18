/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 15:22:41
 * @LastEditTime: 2024-11-18 16:02:35
 * @LastEditors: mulingyuer
 * @Description: 上下文菜单
 * @FilePath: \chrome-extension\src\background\context-menus\index.ts
 * 怎么可能会有bug！！！
 */
import { chromeContextMenu } from "@/utils/chrome-context-menus";
import { chromeMessage, EventName } from "@/utils/chrome-message";
import { ServerlessIdMenu, ApiKeyMenu, PositivePromptMenu } from "./menus";

export class ContextMenus {
	private isInit = false;

	/** 初始化 */
	public init() {
		if (this.isInit) return;
		this.listenEvents();
		this.isInit = true;
	}

	/** 监听事件 */
	private listenEvents() {
		/** 关闭所有菜单 */
		chromeMessage.on(EventName.CLOSE_ALL_MENUS, () => {
			chromeContextMenu.removeAll();
		});

		/** 创建Serverless ID菜单 */
		chromeMessage.on(EventName.CREATE_SERVERLESS_ID_MENU, () => {
			chromeContextMenu.create(ServerlessIdMenu);
		});
		/** 关闭Serverless ID菜单 */
		chromeMessage.on(EventName.CLOSE_SERVERLESS_ID_MENU, () => {
			chromeContextMenu.remove({ id: ServerlessIdMenu.menuProperties.id });
		});

		/** 创建api key菜单 */
		chromeMessage.on(EventName.CREATE_API_KEY_MENU, () => {
			chromeContextMenu.create(ApiKeyMenu);
		});
		/** 关闭api key菜单 */
		chromeMessage.on(EventName.CLOSE_API_KEY_MENU, () => {
			chromeContextMenu.remove({ id: ApiKeyMenu.menuProperties.id });
		});

		/** 创建正向提示词菜单 */
		chromeMessage.on(EventName.CREATE_POSITIVE_PROMPT_MENU, () => {
			chromeContextMenu.create(PositivePromptMenu);
		});
		/** 关闭正向提示词菜单 */
		chromeMessage.on(EventName.CLOSE_POSITIVE_PROMPT_MENU, () => {
			chromeContextMenu.remove({ id: PositivePromptMenu.menuProperties.id });
		});
	}
}

export const contextMenus = new ContextMenus();
