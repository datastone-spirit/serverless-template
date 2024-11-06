/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 11:57:42
 * @LastEditTime: 2024-11-06 14:46:46
 * @LastEditors: mulingyuer
 * @Description: 事件名
 * @FilePath: \chrome-extension\src\utils\chrome-message\event-name.ts
 * 怎么可能会有bug！！！
 */

export enum EventName {
	/** 填充Serverless ID */
	FILL_SERVERLESS_ID = "fill-serverless-id",
	/** 填充api key */
	FILL_API_KEY = "fill-api-key",

	/** 创建右键菜单 */
	CREATE_CONTEXT_MENUS = "create-context-menus",
	/** 打开新页面 */
	OPEN_NEW_PAGE = "open-new-page",

	/** 填充正向提示词 */
	FILL_POSITIVE_PROMPT = "fill-positive-prompt"
}
