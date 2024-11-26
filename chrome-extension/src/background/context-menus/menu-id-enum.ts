/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 16:33:16
 * @LastEditTime: 2024-11-26 11:18:40
 * @LastEditors: mulingyuer
 * @Description: 菜单id
 * @FilePath: \chrome-extension\src\background\context-menus\menu-id-enum.ts
 * 怎么可能会有bug！！！
 */

export enum MenuIdEnum {
	/** 填入Serverless ID */
	MENU_SERVERLESS_ID = "menu_serverless_id",
	/** 填入API key */
	MENU_API_KEY = "menu_api_key",
	/** 填入正向提示词 */
	MENU_POSITIVE_PROMPT = "menu_positive_prompt",
	/** 填入反向提示词 */
	MENU_NEGATIVE_PROMPT = "menu_negative_prompt"
}
