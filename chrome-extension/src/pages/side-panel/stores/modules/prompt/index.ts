/*
 * @Author: mulingyuer
 * @Date: 2024-11-26 11:11:36
 * @LastEditTime: 2024-11-26 11:34:40
 * @LastEditors: mulingyuer
 * @Description: 提示词模块
 * @FilePath: \chrome-extension\src\pages\side-panel\stores\modules\prompt\index.ts
 * 怎么可能会有bug！！！
 */
import { defineStore } from "pinia";

export const usePromptStore = defineStore(
	"prompt",
	() => {
		/** ltx-video 正向提示词 */
		const ltxVideoPrompt = ref("");
		function setLtxVideoPrompt(prompt: string) {
			ltxVideoPrompt.value = prompt;
		}
		/** ltx-video 反向提示词 */
		const ltxVideoNegativePrompt = ref("");
		function setLtxVideoNegativePrompt(prompt: string) {
			ltxVideoNegativePrompt.value = prompt;
		}

		/** sdxl-text2img 正向提示词 */
		const sdxlText2imgPrompt = ref("");
		function setSdxlText2imgPrompt(prompt: string) {
			sdxlText2imgPrompt.value = prompt;
		}

		/** serverless-comfyui 正向提示词 */
		const serverlessComfyuiPrompt = ref("");
		function setServerlessComfyuiPrompt(prompt: string) {
			serverlessComfyuiPrompt.value = prompt;
		}

		return {
			ltxVideoPrompt,
			setLtxVideoPrompt,
			ltxVideoNegativePrompt,
			setLtxVideoNegativePrompt,
			sdxlText2imgPrompt,
			setSdxlText2imgPrompt,
			serverlessComfyuiPrompt,
			setServerlessComfyuiPrompt
		};
	},
	{
		persist: true
	}
);
