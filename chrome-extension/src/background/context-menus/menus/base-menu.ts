/*
 * @Author: mulingyuer
 * @Date: 2024-11-01 16:06:36
 * @LastEditTime: 2024-11-06 11:51:17
 * @LastEditors: mulingyuer
 * @Description: 基础菜单
 * @FilePath: \chrome-extension\src\background\context-menus\menus\base-menu.ts
 * 怎么可能会有bug！！！
 */
import { MenuId } from "@/utils/chrome-context-menus.ts";
import type { CreateMenuOptions } from "@/utils/chrome-context-menus.ts";
import { chromeMessage, EventName } from "@/utils/chrome-message";

export const BaseMenu: CreateMenuOptions[] = [
	{
		menuProperties: {
			id: MenuId.MENU_SERVERLESS_ID,
			title: "填入Serverless ID",
			contexts: ["selection"] // 只有在选中文本时才会出现
		},
		onClicked: (info) => {
			const { selectionText } = info;
			const data = selectionText ?? "";

			chromeMessage.emit(EventName.FILL_SERVERLESS_ID, data);
		}
	},
	{
		menuProperties: {
			id: MenuId.MENU_API_KEY,
			title: "填入API key",
			contexts: ["selection"] // 只有在选中文本时才会出现
		},
		onClicked: (info) => {
			const { selectionText } = info;
			const data = selectionText ?? "";

			chromeMessage.emit(EventName.FILL_API_KEY, data);
		}
	}
];
