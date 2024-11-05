/*
 * @Author: mulingyuer
 * @Date: 2024-11-01 17:05:05
 * @LastEditTime: 2024-11-05 16:22:37
 * @LastEditors: mulingyuer
 * @Description: 定义创建不同右键菜单的枚举
 * @FilePath: \chrome-extension\src\background\context-menus\context-menu-enum.ts
 * 怎么可能会有bug！！！
 */

export enum ContextMenuEnum {
	/** 清空所有业务菜单 */
	CLEAR_ALL_BUSINESS_MENU = "clear_all_business_menu",

	/** 创建ServerlessComfyui菜单 */
	CREATE_SERVERLESS_COMFYUI = "create_serverless_comfyui",

	/** 创建ServerlessSDXLText2Img菜单 */
	CREATE_SERVERLESS_SDXL_TEXT2IMG = "create_serverless_sdxl_text2img"
}
