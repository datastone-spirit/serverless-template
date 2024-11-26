/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 11:57:42
 * @LastEditTime: 2024-11-26 11:17:21
 * @LastEditors: mulingyuer
 * @Description: 事件名
 * @FilePath: \chrome-extension\src\utils\chrome-message\event-name.ts
 * 怎么可能会有bug！！！
 */

export enum EventName {
	/** 关闭所有菜单 */
	CLOSE_ALL_MENUS = "close-all-menus",

	/** 填充Serverless ID */
	FILL_SERVERLESS_ID = "fill-serverless-id",
	/** 创建Serverless ID菜单 */
	CREATE_SERVERLESS_ID_MENU = "create-serverless-id-menu",
	/** 关闭Serverless ID菜单 */
	CLOSE_SERVERLESS_ID_MENU = "close-serverless-id-menu",

	/** 填充api key */
	FILL_API_KEY = "fill-api-key",
	/** 创建api key菜单 */
	CREATE_API_KEY_MENU = "create-api-key-menu",
	/** 关闭api key菜单 */
	CLOSE_API_KEY_MENU = "close-api-key-menu",

	/** 填充正向提示词 */
	FILL_POSITIVE_PROMPT = "fill-positive-prompt",
	/** 创建正向提示词菜单 */
	CREATE_POSITIVE_PROMPT_MENU = "create-positive-prompt-menu",
	/** 关闭正向提示词菜单 */
	CLOSE_POSITIVE_PROMPT_MENU = "close-positive-prompt-menu",
	/** 填充反向提示词 */
	FILL_NEGATIVE_PROMPT = "fill-negative-prompt",
	/** 创建反向提示词菜单 */
	CREATE_NEGATIVE_PROMPT_MENU = "create-negative-prompt-menu",
	/** 关闭反向提示词菜单 */
	CLOSE_NEGATIVE_PROMPT_MENU = "close-negative-prompt-menu",

	/** 打开新页面 */
	OPEN_NEW_PAGE = "open-new-page"
}
