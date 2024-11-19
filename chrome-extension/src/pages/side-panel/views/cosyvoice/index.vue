<!--
 * @Author: mulingyuer
 * @Date: 2024-11-19 09:15:37
 * @LastEditTime: 2024-11-19 15:40:18
 * @LastEditors: mulingyuer
 * @Description: cosyvoice
 * @FilePath: \chrome-extension\src\pages\side-panel\views\cosyvoice\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="cosyvoice">
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
			<FileUpload v-model="form.audio" label="音频素材" name="audio" accept="audio/*" />
			<t-form-item label="音频素材对应的文案" name="origin_audio_text">
				<t-textarea
					v-model="form.origin_audio_text"
					placeholder="请输入音频素材对应的文案"
					:autosize="{ minRows: 3, maxRows: 5 }"
				/>
			</t-form-item>
			<t-form-item label="输出音频文案" name="output_text">
				<t-textarea
					v-model="form.output_text"
					placeholder="输出音频文案"
					:autosize="{ minRows: 3, maxRows: 5 }"
				/>
			</t-form-item>
			<SubmitCancelButtons :loading="loading" @on-cancel="onCancel" />
		</t-form>
		<div class="result">
			<AudioResponse :src="audioSrc" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { FormInstanceFunctions, FormProps, UploadProps } from "tdesign-vue-next";
import APIKey from "@side-panel/components/form/APIKey.vue";
import ServerLessID from "@side-panel/components/form/ServerLessID.vue";
import SubmitCancelButtons from "@side-panel/components/form/SubmitCancelButtons.vue";
import FileUpload from "@side-panel/components/form/FileUpload.vue";
import { request } from "@/request";
import { useServerlessStore } from "@side-panel/stores";
import { fileToBase64 } from "@/utils/tools";
import AudioResponse from "@side-panel/components/response/AudioResponse.vue";

export interface Form {
	serverlessId: string;
	apiKey: string;
	/** 音频素材 */
	audio: UploadProps["value"];
	/** 音频素材对应的文案 */
	origin_audio_text: string;
	/** 输出音频文案 */
	output_text: string;
}

const serverlessStore = useServerlessStore();

const formInstance = ref<FormInstanceFunctions>();
const form = ref<Form>({
	serverlessId: "",
	apiKey: "",
	audio: [],
	origin_audio_text: "",
	output_text: ""
});
const rules: FormProps["rules"] = {
	serverlessId: [{ required: true, message: "请填写ServerLess ID", trigger: "blur" }],
	apiKey: [{ required: true, message: "请填写API key", trigger: "blur" }],
	audio: [{ required: true, message: "请上传音频素材", trigger: "change" }],
	origin_audio_text: [{ required: true, message: "请填写音频素材对应的文案", trigger: "blur" }],
	output_text: [{ required: true, message: "请填写输出音频文案", trigger: "blur" }]
};
const loading = ref(false);
let requestController: AbortController | null = null;
const serverLessIDRef = ref<InstanceType<typeof ServerLessID>>();
const apiKeyRef = ref<InstanceType<typeof APIKey>>();
const audioSrc = ref("");

/** 提交 */
const onSubmit: FormProps["onSubmit"] = async ({ validateResult }) => {
	try {
		if (validateResult !== true) return;
		audioSrc.value = "";
		loading.value = true;
		// 缓存数据
		await saveForm();
		requestController = new AbortController();
		const audio_base64 = await fileToBase64(form.value.audio![0].raw!);
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
						audio_base64: audio_base64.split(",")[1],
						origin_audio_text: form.value.origin_audio_text,
						output_text: form.value.output_text
					})
				}
			})
		});

		const resData = JSON.parse(resString) as { data: { audio_base64: string } };
		audioSrc.value = `data:audio/wav;base64,${resData.data.audio_base64}`;

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
