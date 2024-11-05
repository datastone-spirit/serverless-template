/*
 * @Author: mulingyuer
 * @Date: 2024-11-01 15:26:13
 * @LastEditTime: 2024-11-05 08:47:30
 * @LastEditors: mulingyuer
 * @Description: 谷歌浏览器通知类型
 * @FilePath: \chrome-extension\src\utils\chrome-notifications\types.ts
 * 怎么可能会有bug！！！
 */

/** 基础通知参数 */
export interface BaseNotificationOptions {
	/** 标题 */
	title?: string;
	/** 内容 */
	message: string;
}

/** 错误通知参数 */
export interface ErrorNotificationOptions extends BaseNotificationOptions {}

/** 警告通知参数 */
export interface WarningNotificationOptions extends BaseNotificationOptions {}
