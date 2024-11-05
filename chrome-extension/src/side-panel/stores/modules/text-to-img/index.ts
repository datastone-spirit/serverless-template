/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 09:14:04
 * @LastEditTime: 2024-11-05 16:18:50
 * @LastEditors: mulingyuer
 * @Description: 文生图数据
 * @FilePath: \chrome-extension\src\side-panel\stores\modules\text-to-img\index.ts
 * 怎么可能会有bug！！！
 */
import { defineStore } from "pinia";

export const useTextToImgStore = defineStore(
	"text-to-img",
	() => {
		/** 提示词 */
		const keyword = ref("");
		function setKeyword(value: string) {
			keyword.value = value;
		}

		return {
			keyword,
			setKeyword
		};
	},
	{
		persist: true
	}
);
