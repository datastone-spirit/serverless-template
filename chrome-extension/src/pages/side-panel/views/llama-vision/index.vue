<!--
 * @Author: mulingyuer
 * @Date: 2024-11-18 11:35:13
 * @LastEditTime: 2024-11-21 11:36:03
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
			<t-form-item
				class="advanced-settings"
				:class="{ open: form.advancedSettings }"
				label="高级设置"
				label-align="left"
			>
				<t-switch v-model="form.advancedSettings"></t-switch>
			</t-form-item>
			<template v-if="form.advancedSettings">
				<t-form-item label="返回内容的要求" name="image_content">
					<t-textarea
						v-model="form.image_content"
						placeholder="请输入返回内容的要求"
						:autosize="{ minRows: 3, maxRows: 5 }"
					/>
				</t-form-item>
				<t-form-item label="角色" name="role">
					<t-radio-group v-model="form.role">
						<t-radio value="system">系统</t-radio>
						<t-radio value="user">用户</t-radio>
						<t-radio value="assistant">助手</t-radio>
						<t-radio value="tool">工具</t-radio>
					</t-radio-group>
				</t-form-item>
			</template>
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
import SubmitCancelButtons from "@side-panel/components/form/SubmitCancelButtons.vue";
import mdToHtmlResponse from "@side-panel/components/response/mdToHtmlResponse.vue";
import { useServerlessStore } from "@side-panel/stores";
import { type FormInstanceFunctions, type FormProps, type UploadProps } from "tdesign-vue-next";

export interface Form {
	serverlessId: string;
	apiKey: string;
	img: UploadProps["value"];
	advancedSettings: boolean;
	image_content: string;
	role: string;
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
	advancedSettings: false,
	image_content: "",
	role: "user"
});
const rules: FormProps["rules"] = {
	serverlessId: [{ required: true, message: "请填写ServerLess ID", trigger: "blur" }],
	apiKey: [{ required: true, message: "请填写API key", trigger: "blur" }],
	img: [{ required: true, message: "请上传图片", trigger: "change" }],
	role: [{ required: true, message: "请选择角色", trigger: "change" }]
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
					image_content: form.value.image_content,
					role: form.value.role
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
