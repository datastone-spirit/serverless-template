/*
 * @Author: mulingyuer
 * @Date: 2024-11-18 15:32:13
 * @LastEditTime: 2024-11-18 15:55:39
 * @LastEditors: mulingyuer
 * @Description: api-key 菜单
 * @FilePath: \chrome-extension\src\background\context-menus\menus\api-key.ts
 * 怎么可能会有bug！！！
 */
import { MenuIdEnum } from "../menu-id-enum";
import type { CreateMenuOptions } from "@/utils/chrome-context-menus";
import { chromeMessage, EventName } from "@/utils/chrome-message";

export const ApiKeyMenu: CreateMenuOptions = {
	menuProperties: {
		id: MenuIdEnum.MENU_API_KEY,
		title: "填入API key",
		contexts: ["selection"] // 只有在选中文本时才会出现
	},
	onClicked: (info) => {
		const { selectionText } = info;
		const data = selectionText ?? "";

		chromeMessage.emit(EventName.FILL_API_KEY, data);
	}
};
