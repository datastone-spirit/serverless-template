<!--
 * @Author: mulingyuer
 * @Date: 2024-11-18 11:35:13
 * @LastEditTime: 2024-11-27 09:19:09
 * @LastEditors: mulingyuer
 * @Description: llama-vision
 * @FilePath: \chrome-extension\src\pages\side-panel\views\llama-vision\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="llama-vision">
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
			<AdvancedSettings>
				<t-form-item label="返回内容的要求" name="promptType">
					<t-select
						:value="form.promptType"
						placeholder="请选择返回内容的要求"
						@change="onPromptTypeChange"
					>
						<t-option
							v-for="item in promptTypes"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></t-option>
					</t-select>
					<div class="custom-btn-wrapper">
						<span class="custom-btn-label">编辑：</span>
						<t-switch v-model="isEdit"></t-switch>
					</div>
				</t-form-item>
				<t-form-item class="prompt-word" name="promptWord" :required-mark="false">
					<t-textarea
						v-model="form.promptWord"
						placeholder="请输入返回内容要求"
						:autosize="{ minRows: 8, maxRows: 8 }"
						:readonly="!isEdit"
					/>
				</t-form-item>
				<t-form-item label="角色" name="role">
					<t-select v-model="form.role">
						<t-option key="user" value="user" label="用户"></t-option>
						<t-option key="assistant" value="assistant" label="助手"></t-option>
					</t-select>
				</t-form-item>
				<t-form-item>
					<t-row :gutter="16">
						<t-col flex="1 1 150px">
							<t-form-item label="top_k" name="top_k">
								<t-input-number v-model="form.top_k" :step="0.1" :decimal-places="1" />
							</t-form-item>
						</t-col>
						<t-col flex="1 1 150px">
							<t-form-item label="top_p" name="top_p">
								<t-input-number v-model="form.top_p" :step="0.1" :decimal-places="1" />
							</t-form-item>
						</t-col>
						<t-col flex="1 1 150px">
							<t-form-item label="temperature" name="temperature">
								<t-input-number v-model="form.temperature" :step="0.1" :decimal-places="1" />
							</t-form-item>
						</t-col>
					</t-row>
				</t-form-item>
			</AdvancedSettings>
			<ImageUpload v-model="form.img" name="img" />
			<SubmitCancelButtons :loading="loading" @on-cancel="onCancel" />
		</t-form>
		<div class="result">
			<mdToHtmlResponse :markdown="ocrData" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { request } from "@/request";
import { fileToBase64 } from "@/utils/tools";
import APIKey from "@side-panel/components/form/APIKey.vue";
import ImageUpload from "@side-panel/components/form/ImageUpload.vue";
import ServerLessID from "@side-panel/components/form/ServerLessID.vue";
import AdvancedSettings from "@side-panel/components/form/AdvancedSettings.vue";
import SubmitCancelButtons from "@side-panel/components/form/SubmitCancelButtons.vue";
import mdToHtmlResponse from "@/pages/side-panel/components/response/mdToHtmlResponse/index.vue";
import { useServerlessStore } from "@side-panel/stores";
import {
	type FormInstanceFunctions,
	type FormProps,
	type TdSelectProps,
	type UploadProps
} from "tdesign-vue-next";

export interface Form {
	serverlessId: string;
	apiKey: string;
	img: UploadProps["value"];
	/** 要求类型 */
	promptType: string;
	/** 要求的内容 */
	promptWord: string;
	role: string;
	top_k: number;
	top_p: number;
	temperature: number;
}

/** api响应数据类型 */
interface OcrData {
	data: {
		model: string;
		created_at: string;
		message: {
			role: string;
			content: string;
		};
		done_reason: string;
		done: boolean;
		total_duration: number;
		load_duration: number;
		prompt_eval_count: number;
		prompt_eval_duration: number;
		eval_count: number;
		eval_duration: number;
	};
}

const serverlessStore = useServerlessStore();

const formInstance = ref<FormInstanceFunctions>();
const form = ref<Form>({
	serverlessId: "",
	apiKey: "",
	img: [],
	promptType: "",
	promptWord: "",
	role: "user",
	top_k: 0,
	top_p: 0.9,
	temperature: 0.7
});
const rules: FormProps["rules"] = {
	serverlessId: [{ required: true, message: "请填写ServerLess ID", trigger: "blur" }],
	apiKey: [{ required: true, message: "请填写API key", trigger: "blur" }],
	img: [{ required: true, message: "请上传图片", trigger: "change" }],
	promptType: [
		{ required: true, message: "请选择返回内容的要求", trigger: "blur" },
		{ required: true, message: "请选择返回内容的要求", trigger: "change" }
	],
	promptWord: [{ required: true, message: "请输入返回内容要求", trigger: "blur" }],
	role: [{ required: true, message: "请选择角色", trigger: "change" }],
	top_k: [{ required: true, message: "请填写top_k", trigger: "blur" }],
	top_p: [{ required: true, message: "请填写top_p", trigger: "blur" }],
	temperature: [{ required: true, message: "请填写temperature", trigger: "blur" }]
};
const loading = ref(false);
let requestController: AbortController | null = null;
const ocrData = ref<string>("");
const serverLessIDRef = ref<InstanceType<typeof ServerLessID>>();
const apiKeyRef = ref<InstanceType<typeof APIKey>>();
/** 预设提示词 */
const promptTypes = ref([
	{
		label: "OCR识别",
		value: "ocr",
		content: `你是一款先进的人工智能模型，专门用于从图片中提取文本信息。分析图片时：
	1. 清晰、准确地提取并转录所有可见文本。
	2. 如果图片中包含表格，请分析表格的结构（行、列），并以Markdown格式输出表格内容：
		- 使用正确的Markdown语法，包括表头、行和列。
		- 确保对齐和结构一致，便于阅读。
	3. 如有必要，请提供详细的解释或分解以确保内容清晰易懂。
		`
	},
	{
		label: "描述图片",
		value: "image",
		content: `你是一款先进的人工智能模型，专门分析图片：
	1. 分析图片的作者，并列出作者的详细信息。
	2. 现在这个图的位置在哪里。
	3. 如有必要，请提供详细的解释或分解以确保内容清晰。
	`
	},
	{
		label: "自定义",
		value: "custom",
		content: "请输入自定义的返回内容要求"
	}
]);
const isEdit = ref(false);
const onPromptTypeChange: TdSelectProps["onChange"] = (value) => {
	form.value.promptType = value as string;

	const findItem = promptTypes.value.find((item) => item.value === value);
	if (findItem) {
		form.value.promptWord = findItem.content;
	} else {
		form.value.promptWord = "";
	}

	if (value === "custom") isEdit.value = true;
};

/** 提交 */
const onSubmit: FormProps["onSubmit"] = async ({ validateResult }) => {
	try {
		if (validateResult !== true) return;
		loading.value = true;
		// 缓存数据
		await saveForm();
		requestController = new AbortController();
		ocrData.value = "";
		// api请求
		const resString = await request<OcrData>({
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
					image_base64: await fileToBase64(form.value.img![0].raw!),
					image_content: form.value.promptWord,
					role: form.value.role,
					top_k: form.value.top_k,
					top_p: form.value.top_p,
					temperature: form.value.temperature
				}
			})
		});

		ocrData.value = resString.data.message.content;

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

onMounted(() => {
	// 默认选中第一个要求
	const firstItem = promptTypes.value[0];
	form.value.promptType = firstItem.value;
	form.value.promptWord = firstItem.content;
});
</script>

<style lang="scss" scoped>
.custom-btn-wrapper {
	margin-left: 16px;
	display: flex;
	white-space: nowrap;
}
.custom-btn-label {
	margin-right: 5px;
}
.prompt-word {
	:deep(.t-textarea.t-is-readonly .t-textarea__inner) {
		color: var(--td-text-color-disabled);
	}
}
.result {
	margin-top: 40px;
}
</style>
