/*
 * @Author: mulingyuer
 * @Date: 2024-11-18 15:29:53
 * @LastEditTime: 2024-11-18 15:55:52
 * @LastEditors: mulingyuer
 * @Description: Serverless ID 菜单
 * @FilePath: \chrome-extension\src\background\context-menus\menus\serverless-id.ts
 * 怎么可能会有bug！！！
 */
import { MenuIdEnum } from "../menu-id-enum";
import type { CreateMenuOptions } from "@/utils/chrome-context-menus";
import { chromeMessage, EventName } from "@/utils/chrome-message";

export const ServerlessIdMenu: CreateMenuOptions = {
	menuProperties: {
		id: MenuIdEnum.MENU_SERVERLESS_ID,
		title: "填充 Serverless ID",
		contexts: ["selection"]
	},
	onClicked: (info) => {
		const { selectionText } = info;
		const data = selectionText ?? "";

		chromeMessage.emit(EventName.FILL_SERVERLESS_ID, data);
	}
};
