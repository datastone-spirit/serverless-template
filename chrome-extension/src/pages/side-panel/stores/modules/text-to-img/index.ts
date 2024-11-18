/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 09:14:04
 * @LastEditTime: 2024-11-18 16:15:59
 * @LastEditors: mulingyuer
 * @Description: 文生图数据
 * @FilePath: \chrome-extension\src\pages\side-panel\stores\modules\text-to-img\index.ts
 * 怎么可能会有bug！！！
 */
import { defineStore } from "pinia";

export const useTextToImgStore = defineStore(
	"text-to-img",
	() => {
		/** 正向提示词 */
		const positivePrompt = ref("");
		function setPositivePrompt(value: string) {
			positivePrompt.value = value;
		}

		return {
			positivePrompt,
			setPositivePrompt
		};
	},
	{
		persist: true
	}
);
