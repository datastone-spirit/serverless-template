/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 15:25:46
 * @LastEditTime: 2024-11-21 11:04:29
 * @LastEditors: mulingyuer
 * @Description: 工具函数
 * @FilePath: \chrome-extension\src\utils\tools.ts
 * 怎么可能会有bug！！！
 */

import { MessagePlugin } from "tdesign-vue-next";

/** 写入持久化数据 */
export async function localStorageSet(key: string, value: any) {
	await chrome.storage.local.set({ [key]: value });
}

/** 获取持久化数据 */
export async function localStorageGet(key: string, defaultValue: any) {
	const localData = await chrome.storage.local.get(key);
	const value = localData?.[key];
	if (typeof value === "undefined" && typeof defaultValue !== "undefined") {
		return defaultValue;
	}
	return value;
}

/** 将一个file对象转化为base64字符串 */
export function fileToBase64(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = function (event) {
			return resolve(event.target?.result as string);
		};

		reader.onerror = function (error) {
			console.error("转换base64失败", error);
			return reject(new Error("转换base64失败"));
		};

		reader.readAsDataURL(file);
	});
}

/** 下载base64字符串的文件 */
export function downloadBase64File(base64: string, fileName: string) {
	const link = document.createElement("a");
	link.href = base64;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

/** 将图片file转成blob链接 */
export function fileToBlobUrl(file: File) {
	return URL.createObjectURL(file);
}

/** 将blob链接从内存中释放 */
export function releaseBlobUrl(url: string) {
	URL.revokeObjectURL(url);
}

/** 复制功能 */
export const copyText = (() => {
	const { copy } = useClipboard();
	return function copyText(text: string) {
		copy(text)
			.then(() => {
				MessagePlugin.success("复制成功");
			})
			.catch((_e) => {
				MessagePlugin.error("复制失败");
				console.error(_e);
			});
	};
})();

/**
 * @description: 复制函数
 * @param {string | HTMLElement} val
 * @Date: 2022-09-04 23:26:12
 * @Author: mulingyuer
 */
export function copy(val: string | HTMLElement | ShadowRoot): Promise<void> {
	return new Promise((resolve, reject) => {
		/** 是否允许复制 */
		const isSupported = document.queryCommandSupported("copy");
		if (!isSupported) {
			MessagePlugin.error("当前设备不支持复制功能");
		}

		/** 确认需要选中的内容 */
		let copyVal: string | HTMLElement | ShadowRoot = "";
		if (typeof val === "string") {
			copyVal = val;
		} else if (
			val instanceof HTMLInputElement ||
			val instanceof HTMLTextAreaElement ||
			val instanceof HTMLSelectElement
		) {
			copyVal = val.value;
		} else {
			copyVal = val;
		}

		/** 文本复制与dom的复制 */
		let status: boolean;
		if (typeof copyVal === "string") {
			status = copyString(copyVal);
		} else {
			status = copyNodeText(copyVal);
		}

		if (status) {
			MessagePlugin.success("复制成功");
		} else {
			MessagePlugin.error("复制失败");
		}
	});
}

/**
 * @description: 复制纯文本
 * @param {string} val
 * @Date: 2022-09-04 23:42:46
 * @Author: mulingyuer
 */
function copyString(val: string): boolean {
	const textarea = document.createElement("textarea");
	textarea.value = val;
	//只读防止选中而产生的页面跳动
	textarea.readOnly = true;
	//不让元素展示出来
	textarea.style.position = "absolute";
	textarea.style.left = "-9999px";
	textarea.style.top = "-9999px";
	textarea.style.opacity = "0";
	document.body.appendChild(textarea);
	//选中元素的文本
	textarea.select();
	textarea.setSelectionRange(0, val.length); //这个应该是兼容作用
	//复制命令
	const copyFlag = document.execCommand("copy");
	//用完删除
	textarea.remove();

	return copyFlag;
}

/**
 * @description: 复制节点文本
 * @param {HTMLElement} val
 * @Date: 2022-09-04 23:44:52
 * @Author: mulingyuer
 */
function copyNodeText(node: HTMLElement | ShadowRoot): boolean {
	let isEditable = false;
	if (node instanceof HTMLElement) {
		if (node.hasAttribute("contenteditable") && node.getAttribute("contenteditable") !== "false") {
			isEditable = true;
		}
		//暂时移除，用完回复
		if (isEditable) {
			node.removeAttribute("contenteditable");
		}
	}

	//选中元素的文本
	//获取Selection对象
	const selection = window.getSelection()!;
	//创建区域
	const range = document.createRange();
	range.selectNodeContents(node);
	//先移除所有选区
	selection.removeAllRanges();
	//传入区域
	selection.addRange(range);
	//复制
	const copyFlag = document.execCommand("copy");
	//取消选中
	selection.removeAllRanges();
	//恢复
	if (isEditable) {
		(node as HTMLElement).setAttribute("contenteditable", "true");
	}

	return copyFlag;
}
