<!--
 * @Author: mulingyuer
 * @Date: 2024-11-20 11:45:46
 * @LastEditTime: 2024-11-20 17:12:03
 * @LastEditors: mulingyuer
 * @Description: whisper 语音转文字
 * @FilePath: \chrome-extension\src\pages\side-panel\views\whisper\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="whisper">
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
			<t-form-item label="音频语言" name="language">
				<t-select v-model="form.language" placeholder="请选择音频语言" clearable filterable>
					<t-option
						v-for="item in Languages"
						:key="item.value"
						:value="item.value"
						:label="item.name"
					></t-option>
				</t-select>
			</t-form-item>
			<t-form-item
				class="advanced-settings"
				:class="{ open: form.advancedSettings }"
				label="高级设置"
				label-align="left"
			>
				<t-switch v-model="form.advancedSettings"></t-switch>
			</t-form-item>
			<template v-if="form.advancedSettings">
				<t-form-item label="模型" name="model">
					<t-radio-group v-model="form.model">
						<t-radio value="tiny">tiny</t-radio>
						<t-radio value="base">base</t-radio>
						<t-radio value="small">small</t-radio>
						<t-radio value="medium">medium</t-radio>
						<t-radio value="large-v1">large-v1</t-radio>
						<t-radio value="large-v2">large-v2</t-radio>
						<t-radio value="large-v3">large-v3</t-radio>
					</t-radio-group>
				</t-form-item>
			</template>
			<SubmitCancelButtons :loading="loading" @on-cancel="onCancel" />
		</t-form>
		<div class="result">
			<JsonResponse :json="audioText" show-copy />
		</div>
	</div>
</template>

<script setup lang="ts">
import { request } from "@/request";
import { fileToBase64 } from "@/utils/tools";
import APIKey from "@side-panel/components/form/APIKey.vue";
import FileUpload from "@side-panel/components/form/FileUpload.vue";
import ServerLessID from "@side-panel/components/form/ServerLessID.vue";
import SubmitCancelButtons from "@side-panel/components/form/SubmitCancelButtons.vue";
import JsonResponse from "@side-panel/components/response/JsonResponse.vue";
import { useServerlessStore } from "@side-panel/stores";
import { type FormInstanceFunctions, type FormProps, type UploadProps } from "tdesign-vue-next";
import { Languages } from "./language";

export interface Form {
	serverlessId: string;
	apiKey: string;
	/** 音频文件 */
	audio: UploadProps["value"];
	/** 语言 */
	language: string;
	/** 高级设置 */
	advancedSettings: boolean;
	/** 模型 */
	model: string;
}

interface AudioTextData {
	model: string;
	detected_language: string;
	device: string;
	segments: Array<{
		id: number;
		seek: number;
		start: number;
		end: number;
		text: string;
		tokens: number[];
		temperature: number;
		avg_logprob: unknown;
		compression_ratio: number;
		no_speech_prob: number;
	}>;
	transcription: string;
	translation: null;
	word_timestamps: null;
}

const serverlessStore = useServerlessStore();

const formInstance = ref<FormInstanceFunctions>();
const form = ref<Form>({
	serverlessId: "",
	apiKey: "",
	audio: [],
	language: "zh-CN",
	advancedSettings: false,
	model: "base"
});
const rules: FormProps["rules"] = {
	serverlessId: [{ required: true, message: "请填写ServerLess ID", trigger: "blur" }],
	apiKey: [{ required: true, message: "请填写API key", trigger: "blur" }],
	audio: [{ required: true, message: "请上传音频", trigger: "change" }],
	language: [{ required: true, message: "请选择语言", trigger: "change" }],
	model: [{ required: true, message: "请选择模型", trigger: "change" }]
};
const loading = ref(false);
let requestController: AbortController | null = null;
const audioText = ref<string>("");
const serverLessIDRef = ref<InstanceType<typeof ServerLessID>>();
const apiKeyRef = ref<InstanceType<typeof APIKey>>();

/** 获取音频base64编码-去除前缀 */
async function getAudioBase64(file: File) {
	const base64 = await fileToBase64(file);
	return base64.split(",")[1];
}

/** 获取音频语言 */
function getLanguage(language: string) {
	const zhList = ["zh-CN", "zh-TW"];
	const data = {
		language: language,
		initial_prompt: ""
	};

	if (!zhList.includes(language)) return data;

	switch (language) {
		case "zh-CN":
			data.language = "zh";
			data.initial_prompt = "简体";
			break;
		case "zh-TW":
			data.language = "zh";
			data.initial_prompt = "繁体";
			break;
	}

	return data;
}

/** 提交 */
const onSubmit: FormProps["onSubmit"] = async ({ validateResult }) => {
	try {
		if (validateResult !== true) return;
		loading.value = true;
		audioText.value = "";
		// 缓存数据
		await saveForm();
		requestController = new AbortController();
		// api请求
		const langData = getLanguage(form.value.language);
		const audioTextData = await request<AudioTextData>({
			url: `${form.value.serverlessId}/sync`,
			method: "post",
			responseType: "json",
			signal: requestController.signal,
			prefixUrl: serverlessStore.baseUrl,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${form.value.apiKey}`
			},
			body: JSON.stringify({
				input: {
					audio_base64: await getAudioBase64(form.value.audio![0].raw!),
					language: langData.language,
					initial_prompt: langData.initial_prompt
				}
			})
		});

		audioText.value = audioTextData.transcription;

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
.advanced-settings {
	&.open {
		margin-bottom: 0px;
	}
}
.result {
	margin-top: 40px;
}
</style>
