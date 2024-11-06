/*
 * @Author: mulingyuer
 * @Date: 2024-11-06 11:43:36
 * @LastEditTime: 2024-11-06 11:50:17
 * @LastEditors: mulingyuer
 * @Description: 提示词菜单
 * @FilePath: \chrome-extension\src\background\context-menus\menus\prompt.ts
 * 怎么可能会有bug！！！
 */
import { MenuId } from "@/utils/chrome-context-menus.ts";
import type { CreateMenuOptions } from "@/utils/chrome-context-menus.ts";
import { chromeMessage, EventName } from "@/utils/chrome-message";

/** 正向提示词菜单 */
export const PositivePromptMenu: CreateMenuOptions = {
	menuProperties: {
		id: MenuId.MENU_POSITIVE_PROMPT,
		title: "填入正向提示词",
		contexts: ["selection"] // 只有在选中文本时才会出现
	},
	onClicked: (info) => {
		const { selectionText } = info;
		const data = selectionText ?? "";

		chromeMessage.emit(EventName.FILL_POSITIVE_PROMPT, data);
	}
};
