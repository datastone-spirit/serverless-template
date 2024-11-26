/*
 * @Author: mulingyuer
 * @Date: 2024-11-26 11:18:11
 * @LastEditTime: 2024-11-26 11:20:58
 * @LastEditors: mulingyuer
 * @Description: 负面提示词
 * @FilePath: \chrome-extension\src\background\context-menus\menus\negative-prompt.ts
 * 怎么可能会有bug！！！
 */
import { MenuIdEnum } from "../menu-id-enum";
import type { CreateMenuOptions } from "@/utils/chrome-context-menus";
import { chromeMessage, EventName } from "@/utils/chrome-message";

/** 正向提示词菜单 */
export const NegativePromptMenu: CreateMenuOptions = {
	menuProperties: {
		id: MenuIdEnum.MENU_NEGATIVE_PROMPT,
		title: "填入负面提示词",
		contexts: ["selection"] // 只有在选中文本时才会出现
	},
	onClicked: (info) => {
		const { selectionText } = info;
		const data = selectionText ?? "";

		chromeMessage.emit(EventName.FILL_NEGATIVE_PROMPT, data);
	}
};
