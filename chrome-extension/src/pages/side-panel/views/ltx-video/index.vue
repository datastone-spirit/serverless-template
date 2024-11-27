<!--
 * @Author: mulingyuer
 * @Date: 2024-11-26 10:11:26
 * @LastEditTime: 2024-11-27 09:07:02
 * @LastEditors: mulingyuer
 * @Description: LTX-Video
 * @FilePath: \chrome-extension\src\pages\side-panel\views\ltx-video\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="ltx-video">
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
			<PositivePrompt ref="positivePromptRef" v-model="form.positive" name="positive" />
			<WidthOrHeight
				v-model:width="form.videoWidth"
				v-model:height="form.videoHeight"
				width-label="视频宽度"
				width-name="videoWidth"
				height-label="视频高度"
				height-name="videoHeight"
			/>
			<AdvancedSettings v-model="form.openAdvanced">
				<NegativePrompt v-model="form.negative" name="negative" />
				<Seed v-model="form.seed" name="seed" />
				<Steps v-model="form.steps" name="steps" />
			</AdvancedSettings>
			<SubmitCancelButtons :loading="loading" @on-cancel="onCancel" />
		</t-form>
		<div class="result"></div>
	</div>
</template>

<script setup lang="ts">
import { request } from "@/request";
import APIKey from "@side-panel/components/form/APIKey.vue";
import ServerLessID from "@side-panel/components/form/ServerLessID.vue";
import WidthOrHeight from "@side-panel/components/form/WidthOrHeight.vue";
import AdvancedSettings from "@side-panel/components/form/AdvancedSettings.vue";
import NegativePrompt from "@side-panel/components/form/NegativePrompt.vue";
import Seed from "@side-panel/components/form/Seed.vue";
import Steps from "@side-panel/components/form/Steps.vue";
import SubmitCancelButtons from "@side-panel/components/form/SubmitCancelButtons.vue";
import PositivePrompt from "@side-panel/components/form/PositivePrompt.vue";
import { useServerlessStore, usePromptStore } from "@side-panel/stores";
import type { FormInstanceFunctions, FormProps } from "tdesign-vue-next";

export interface Form {
	apiKey: string;
	serverlessId: string;
	/** 正向提示词 */
	positive: string;
	/** 反向提示词 */
	negative: string;
	/** 视频宽度 */
	videoWidth: number;
	/** 视频高度 */
	videoHeight: number;
	/** 种子 */
	seed: number | "";
	/** 推理步骤 */
	steps: number;
	/** 高级设置 */
	openAdvanced: boolean;
}

const serverlessStore = useServerlessStore();
const promptStore = usePromptStore();

const formInstance = ref<FormInstanceFunctions>();
const form = ref<Form>({
	serverlessId: "",
	apiKey: "",
	positive: "",
	negative: "",
	videoWidth: 512,
	videoHeight: 512,
	seed: "",
	steps: 30,
	openAdvanced: false
});
const rules: FormProps["rules"] = {
	serverlessId: [{ required: true, message: "请填写ServerLess ID", trigger: "blur" }],
	apiKey: [{ required: true, message: "请填写API key", trigger: "blur" }],
	positive: [{ required: true, message: "请填写正向提示词", trigger: "blur" }],
	videoWidth: [{ required: true, message: "请填写视频宽度", trigger: "blur" }],
	videoHeight: [{ required: true, message: "请填写视频高度", trigger: "blur" }],
	seed: [
		{
			validator: (val) => {
				if (isNaN(+val)) {
					return {
						message: "请输入数字",
						result: false,
						type: "error"
					};
				}

				return {
					message: "",
					result: true,
					type: "success"
				};
			},
			trigger: "blur"
		}
	],
	steps: [
		{
			required: true,
			message: "请填写推理步数",
			trigger: "blur"
		}
	]
};
const loading = ref(false);
let requestController: AbortController | null = null;
const serverLessIDRef = ref<InstanceType<typeof ServerLessID>>();
const apiKeyRef = ref<InstanceType<typeof APIKey>>();

/** 提交 */
const onSubmit: FormProps["onSubmit"] = async ({ validateResult }) => {
	try {
		if (validateResult !== true) return;
		loading.value = true;
		// 缓存数据
		await saveForm();
		requestController = new AbortController();

		// api请求
		const resString = await request<string>({
			url: `${form.value.serverlessId}/sync`,
			method: "post",
			responseType: "json",
			timeout: 100000000, // 100秒超时
			signal: requestController.signal,
			prefixUrl: serverlessStore.baseUrl,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${form.value.apiKey}`
			},
			body: JSON.stringify({
				input: {
					prompt: JSON.stringify({
						serverlessId: form.value.serverlessId,
						apiKey: form.value.apiKey,
						positive: form.value.positive,
						negative: form.value.negative,
						videoWidth: form.value.videoWidth,
						videoHeight: form.value.videoHeight,
						seed: form.value.seed,
						steps: form.value.steps
					})
				}
			})
		});

		console.log("🚀 ~ constonSubmit:FormProps[onSubmit]= ~ resString:", resString);

		// const resData = JSON.parse(resString) as { data: { audio_base64: string } };
		// audioSrc.value = `data:audio/wav;base64,${resData.data.audio_base64}`;

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
	promptStore.setLtxVideoPrompt(form.value.positive);
	promptStore.setLtxVideoNegativePrompt(form.value.negative);
}

onMounted(() => {
	form.value.positive = promptStore.ltxVideoPrompt;
	form.value.negative = promptStore.ltxVideoNegativePrompt;
});
</script>

<style lang="scss" scoped>
.result {
	margin-top: 40px;
}
</style>
