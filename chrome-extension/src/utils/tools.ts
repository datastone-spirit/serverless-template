/*
 * @Author: mulingyuer
 * @Date: 2024-11-15 15:25:46
 * @LastEditTime: 2024-11-19 11:48:52
 * @LastEditors: mulingyuer
 * @Description: 工具函数
 * @FilePath: \chrome-extension\src\utils\tools.ts
 * 怎么可能会有bug！！！
 */
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
	console.log("🚀 ~ fileToBase64 ~ file:", file);
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
