/*
 * @Author: mulingyuer
 * @Date: 2024-11-08 17:27:46
 * @LastEditTime: 2024-11-08 17:47:57
 * @LastEditors: mulingyuer
 * @Description: 图片预览 main
 * @FilePath: \chrome-extension\src\image-preview\main.ts
 * 怎么可能会有bug！！！
 */
// style
import "@/styles/index.scss";
import "./styles/index.scss";

// script
chrome.storage.local.get("Base64ImgData", (result) => {
	const data = result.Base64ImgData;
	if (data) {
		const img = document.createElement("img");
		img.src = data;
		document.body.appendChild(img);
	}
});
