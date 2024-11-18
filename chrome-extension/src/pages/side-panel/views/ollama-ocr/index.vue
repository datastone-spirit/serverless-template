<!--
 * @Author: mulingyuer
 * @Date: 2024-11-18 11:35:13
 * @LastEditTime: 2024-11-18 16:18:38
 * @LastEditors: mulingyuer
 * @Description: ollama-OCR
 * @FilePath: \chrome-extension\src\pages\side-panel\views\ollama-ocr\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="ollama-ocr">
		<t-form
			ref="formInstance"
			:data="form"
			label-align="top"
			:rules="rules"
			colon
			@submit="onSubmit"
		>
			<ServerLessID ref="serverLessIDRef" v-model="form.serverlessId" name="serverlessId" />
			<APIKey ref="apiKeyRef" v-model="form.apiKey" name="apiKey" />
			<SubmitCancelButtons :loading="loading" @on-cancel="onCancel" />
		</t-form>
		<div class="result">
			<JsonResponse :json="ocrData" />
		</div>
	</div>
</template>

<script setup lang="ts">
import APIKey from "@side-panel/components/form/APIKey.vue";
import ServerLessID from "@side-panel/components/form/ServerLessID.vue";
import SubmitCancelButtons from "@side-panel/components/form/SubmitCancelButtons.vue";
import JsonResponse from "@side-panel/components/response/JsonResponse.vue";
import { type FormInstanceFunctions, type FormProps } from "tdesign-vue-next";

export interface Form {
	serverlessId: string;
	apiKey: string;
	img: File | null;
}

const formInstance = ref<FormInstanceFunctions>();
const form = ref<Form>({
	serverlessId: "",
	apiKey: "",
	img: null
});
const rules: FormProps["rules"] = {
	serverlessId: [{ required: true, message: "请填写ServerLess ID", trigger: "blur" }],
	apiKey: [{ required: true, message: "请填写API key", trigger: "blur" }],
	img: [{ required: true, message: "请上传图片", trigger: "change" }]
};
const loading = ref(false);
let requestController: AbortController | null = null;
const ocrData = ref<string>("");
const serverLessIDRef = ref<InstanceType<typeof ServerLessID>>();
const apiKeyRef = ref<InstanceType<typeof APIKey>>();

/** 提交 */
const onSubmit: FormProps["onSubmit"] = async ({ validateResult }) => {
	try {
		if (validateResult !== true) return;
		loading.value = true;
		// 缓存数据
		console.log(form.value);
		await saveForm();
		requestController = new AbortController();
		// api请求
		// const resString = await request<string>({
		// 	url: `${form.value.serverlessId}/sync`,
		// 	method: "post",
		// 	responseType: "json",
		// 	signal: requestController.signal,
		// 	prefixUrl: serverlessStore.baseUrl,
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${form.value.apiKey}`
		// 	}
		// 	// body: JSON.stringify({
		// 	// 	input: { prompt: form.value.keywords }
		// 	// })
		// });
		// const data = JSON.parse(resString) as { image: string };

		loading.value = false;
	} catch (_error) {
		loading.value = false;
	}
};

/** 取消请求 */
function onCancel() {
	if (!requestController) return;
	requestController.abort();
	requestController = null;
}

/** 存储缓存数据 */
function saveForm() {
	serverLessIDRef.value?.saveData();
	apiKeyRef.value?.saveData();
}
</script>

<style lang="scss" scoped>
.result {
	margin-top: 40px;
}
</style>
