/*
 * @Author: mulingyuer
 * @Date: 2024-11-01 15:01:43
 * @LastEditTime: 2024-11-06 14:46:41
 * @LastEditors: mulingyuer
 * @Description: 按钮id
 * @FilePath: \chrome-extension\src\utils\chrome-context-menus.ts\menu-id.ts
 * 怎么可能会有bug！！！
 */

// export enum MenuId {
// 	/** 填入Serverless ID */
// 	INPUT_SERVERLESS_ID = "input_serverless_id",
// 	/** 填入API key */
// 	INPUT_API_KEY = "input_api_key",
// 	/** 填入正向提示词 */
// 	INPUT_POSITIVE_PROMPT = "input_positive_prompt",
// 	/** serverless-comfyui填入关键词 */
// 	SERVERLESS_COMFYUI_INPUT_KEYWORD = "serverless_comfyui_input_keyword"
// }

export enum MenuId {
	/** 填入Serverless ID */
	MENU_SERVERLESS_ID = "menu_serverless_id",
	/** 填入API key */
	MENU_API_KEY = "menu_api_key",
	/** 填入正向提示词 */
	MENU_POSITIVE_PROMPT = "menu_positive_prompt"
}
