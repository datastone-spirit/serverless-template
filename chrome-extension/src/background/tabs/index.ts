/*
 * @Author: mulingyuer
 * @Date: 2024-11-05 11:27:15
 * @LastEditTime: 2024-11-05 11:32:12
 * @LastEditors: mulingyuer
 * @Description: tabs
 * @FilePath: \chrome-extension\src\background\tabs\index.ts
 * 怎么可能会有bug！！！
 */
import { chromeMessage, EventName } from "@/utils/chrome-message";

export class Tabs {
	/** 是否初始化 */
	private isInit = false;

	/** 初始化 */
	public init() {
		if (this.isInit) return;
		this.isInit = true;
		this.watchOpenNewPage();
	}

	/** 监听打开新页面事件 */
	private watchOpenNewPage() {
		chromeMessage.on(EventName.OPEN_NEW_PAGE, (message) => {
			const { data } = message;

			if (typeof data === "string" && data.trim() !== "") {
				chrome.tabs.create({ url: data });
			}
		});
	}
}

export const tabs = new Tabs();