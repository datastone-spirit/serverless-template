/*
 * @Author: mulingyuer
 * @Date: 2024-11-05 11:27:15
 * @LastEditTime: 2024-11-20 10:11:20
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
			console.log("🚀 ~ Tabs ~ chromeMessage.on ~ message:", message);
			const { data } = message;
			if (typeof data !== "string" || data.trim() === "") return;

			// 如果是base64图片
			if (data.startsWith("data:image/")) {
				chrome.storage.local.set({ Base64ImgData: data }, () => {
					chrome.tabs.create({
						url: chrome.runtime.getURL("src/pages/image-preview/index.html")
					});
				});
			} else {
				chrome.tabs.create({ url: data });
			}
		});
	}

	/** 将base64图片转换为blob对象 */
	private base64ToBlob(base64: string): Blob {
		// 图片格式
		const regData = /^data:(.*?);base64,/.exec(base64);
		const imgType = regData ? regData[1] : "image/png";
		// 生成blob对象
		const byteCharacters = atob(base64.split(",")[1]);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);

		return new Blob([byteArray], { type: imgType });
	}
}

export const tabs = new Tabs();
