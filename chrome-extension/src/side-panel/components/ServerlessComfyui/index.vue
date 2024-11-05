<!--
 * @Author: mulingyuer
 * @Date: 2024-10-29 15:29:30
 * @LastEditTime: 2024-11-05 09:26:18
 * @LastEditors: mulingyuer
 * @Description: base64图片组件
 * @FilePath: \chrome-extension\src\side-panel\components\ServerlessComfyui\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="image-component">
		<t-form ref="formInstance" :data="form" label-align="top" :rules="rules" @submit="onSubmit">
			<t-form-item label="ServerLess ID" name="serverlessId">
				<t-input v-model="form.serverlessId" placeholder="请输入ServerLess ID"></t-input>
			</t-form-item>
			<t-form-item label="API key" name="apiKey">
				<t-input v-model="form.apiKey" placeholder="请输入API key"></t-input>
			</t-form-item>
			<t-form-item label="关键词" name="keywords">
				<t-textarea
					v-model="form.keywords"
					placeholder="请输入关键词，英文逗号分隔"
					:autosize="{ minRows: 5, maxRows: 5 }"
				/>
			</t-form-item>
			<t-form-item>
				<t-row :gutter="16">
					<t-col :span="6">
						<t-form-item label="宽度" name="width" label-align="left" label-width="auto">
							<t-input v-model.number="form.width" placeholder="请输入宽度"></t-input>
						</t-form-item>
					</t-col>
					<t-col :span="6">
						<t-form-item label="高度" name="height" label-align="left" label-width="auto">
							<t-input v-model.number="form.height" placeholder="请输入高度"></t-input>
						</t-form-item>
					</t-col>
				</t-row>
			</t-form-item>
			<t-form-item label="选择模型" name="isLarge">
				<t-radio-group v-model="form.isLarge">
					<t-radio :value="true">SD3.5 Large</t-radio>
					<t-radio :value="false">SD3.5 Medium</t-radio>
				</t-radio-group>
			</t-form-item>
			<t-form-item>
				<t-row class="btn-row" :gutter="8">
					<t-col :span="9">
						<t-button theme="primary" type="submit" size="large" block :loading="loading">
							{{ loading ? "正在请求" : "发起请求" }}
						</t-button>
					</t-col>
					<t-col :span="3">
						<t-button theme="default" size="large" block @click="onCancel"> 取消 </t-button>
					</t-col>
				</t-row>
			</t-form-item>
		</t-form>
		<div class="result">
			<div v-if="isImg" class="image-preview">
				<t-image v-if="imgSrc" class="image-preview-img" :src="imgSrc" fit="contain" />
				<t-empty v-else />
			</div>
			<div v-else class="other-data">
				<t-textarea
					v-model="otherData"
					placeholder="暂无内容"
					:autosize="{ minRows: 5, maxRows: 15 }"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { MessagePlugin, type FormInstanceFunctions, type FormProps } from "tdesign-vue-next";
import { request } from "@/request";
import { useServerlessStore, useTextToImgStore } from "@side-panel/stores";
import { chromeMessage, EventName } from "@/utils/chrome-message";
import type { EventCallback } from "@/utils/chrome-message";
import { ContextMenuEnum } from "@/background/context-menus";

export interface Form {
	serverlessId: string;
	apiKey: string;
	/** 关键词 */
	keywords: string;
	/** 宽度 */
	width: number;
	/** 高度 */
	height: number;
	/** 模型切换，true为sd3.5_large，false为sd3.5_medium */
	isLarge: boolean;
}

const serverlessStore = useServerlessStore();
const textToImgStore = useTextToImgStore();

const formInstance = ref<FormInstanceFunctions>();
const form = ref<Form>({
	serverlessId: "",
	apiKey: "",
	keywords: "",
	width: 512,
	height: 512,
	isLarge: true
});
const rules: FormProps["rules"] = {
	serverlessId: [{ required: true, message: "请填写ServerLess ID", trigger: "blur" }],
	apiKey: [{ required: true, message: "请填写API key", trigger: "blur" }],
	keywords: [{ required: true, message: "请填写关键词", trigger: "blur" }],
	width: [{ required: true, message: "请填写宽度", trigger: "blur" }],
	height: [{ required: true, message: "请填写高度", trigger: "blur" }],
	isLarge: [{ required: true, message: "请选择模型", trigger: "blur" }]
};
const loading = ref(false);
let requestController: AbortController | null = null;
const isImg = ref(true);
const imgSrc = ref("");
const otherData = ref("");

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
			signal: requestController.signal,
			prefixUrl: serverlessStore.baseUrl,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${form.value.apiKey}`
			},
			body: JSON.stringify({
				input: {
					prompt: JSON.stringify({
						keywords: form.value.keywords,
						width: form.value.width,
						height: form.value.height,
						isLarge: form.value.isLarge
					})
				}
			})
		});
		const data = JSON.parse(resString) as { image: string };

		if (Object.hasOwn(data, "image")) {
			isImg.value = true;
			imgSrc.value = `data:image/png;base64, ${data.image}`;
		} else {
			isImg.value = false;
			otherData.value = typeof resString === "string" ? resString : JSON.stringify(resString);
		}

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

	isImg.value = true;
	imgSrc.value = "";
	otherData.value = "";
	loading.value = false;
}

/** 初始化表单 */
function initForm() {
	form.value.serverlessId = serverlessStore.serverlessId;
	form.value.apiKey = serverlessStore.apiKey;
	form.value.keywords = textToImgStore.keyword;
}

/** 存储缓存数据 */
function saveForm() {
	serverlessStore.setServerlessId(form.value.serverlessId);
	serverlessStore.setApiKey(form.value.apiKey);
	textToImgStore.setKeyword(form.value.keywords);
}

/** 填充Serverless ID回调 */
const onFillServerlessId: EventCallback = (message) => {
	const { data } = message;
	if (!data) return;
	form.value.serverlessId = data;
};

/** 填充API key回调 */
const onFillApiKey: EventCallback = (message) => {
	const { data } = message;
	if (!data) return;
	form.value.apiKey = data;
};

/** 填充关键词回调 */
const onFillKeyword: EventCallback = (message) => {
	const { data } = message;
	if (!data) return;
	form.value.keywords = data;
};

/** 监听上下文菜单事件 */
function onContextMenu() {
	/** 填充Serverless ID */
	chromeMessage.on(EventName.FILL_SERVERLESS_ID, onFillServerlessId);

	/** 填充API key */
	chromeMessage.on(EventName.FILL_API_KEY, onFillApiKey);

	/** 填充关键词 */
	chromeMessage.on(EventName.SERVERLESS_COMFYUI_FILL_KEYWORD, onFillKeyword);

	/** 创建上下文菜单 */
	chromeMessage.emit(EventName.CREATE_CONTEXT_MENUS, ContextMenuEnum.CREATE_SERVERLESS_COMFYUI);
}

/** 解除监听上下文菜单事件 */
function offContextMenu() {
	chromeMessage.off(EventName.FILL_SERVERLESS_ID, onFillServerlessId);
	chromeMessage.off(EventName.FILL_API_KEY, onFillApiKey);
	chromeMessage.off(EventName.SERVERLESS_COMFYUI_FILL_KEYWORD, onFillKeyword);
}

/** 初始化 */
async function init() {
	try {
		await initForm();
	} catch (error) {
		MessagePlugin.error((error as Error)?.message);
	}
}

onMounted(() => {
	init();
	onContextMenu();
});

onUnmounted(() => {
	offContextMenu();
});
</script>

<style lang="scss" scoped>
.btn-row {
	width: 100%;
}
.result {
	margin-top: 40px;
	position: relative;
	&::before {
		content: "";
		padding-top: 70%;
		display: block;
	}
}
.image-preview,
.other-data {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
}
.image-preview {
	bottom: 0;
	overflow: hidden;
	border-width: 1px;
	border-style: solid;
	border-radius: var(--td-radius-default);
	border-color: var(--td-border-level-2-color);
	display: flex;
	justify-content: center;
	align-items: center;
}
.image-preview-img {
	width: 100%;
	height: 100%;
}
</style>
