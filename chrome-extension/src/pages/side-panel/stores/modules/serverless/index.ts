/*
 * @Author: mulingyuer
 * @Date: 2024-10-31 09:25:57
 * @LastEditTime: 2024-10-31 15:32:42
 * @LastEditors: mulingyuer
 * @Description: Serverless 数据
 * @FilePath: \serverless-api-tester\src\side-panel\stores\modules\serverless\index.ts
 * 怎么可能会有bug！！！
 */
import { defineStore } from "pinia";

export const useServerlessStore = defineStore(
	"serverless",
	() => {
		const baseUrl = ref("https://api-serverless.datastone.cn/v1");
		function setBaseUrl(url: string) {
			baseUrl.value = url;
		}

		const serverlessId = ref("");
		function setServerlessId(id: string) {
			serverlessId.value = id;
		}

		const apiKey = ref("");
		function setApiKey(key: string) {
			apiKey.value = key;
		}

		return {
			baseUrl,
			setBaseUrl,
			serverlessId,
			setServerlessId,
			apiKey,
			setApiKey
		};
	},
	{
		persist: true
	}
);
