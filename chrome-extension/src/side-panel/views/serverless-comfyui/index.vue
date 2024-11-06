<!--
 * @Author: mulingyuer
 * @Date: 2024-10-29 15:29:30
 * @LastEditTime: 2024-11-06 11:56:01
 * @LastEditors: mulingyuer
 * @Description: base64图片组件
 * @FilePath: \chrome-extension\src\side-panel\views\serverless-comfyui\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="image-component">
		<t-form
			ref="formInstance"
			:data="form"
			label-align="top"
			:rules="rules"
			colon
			@submit="onSubmit"
		>
			<ServerLessID v-model="form.serverlessId" name="serverlessId" />
			<APIKey v-model="form.apiKey" name="apiKey" />
			<Keywords v-model="form.keywords" name="keywords" />
			<WidthOrHeight
				v-model:width="form.width"
				v-model:height="form.height"
				width-name="width"
				height-name="height"
			/>
			<t-form-item label="选择模型" name="isLarge">
				<t-radio-group v-model="form.isLarge">
					<t-radio :value="true">SD3.5 Large</t-radio>
					<t-radio :value="false">SD3.5 Medium</t-radio>
				</t-radio-group>
			</t-form-item>
			<SubmitCancelButtons :loading="loading" @on-cancel="onCancel" />
		</t-form>
		<div class="result">
			<ImageResponse v-if="isImg" :src="imgSrc" />
			<JsonResponse v-else :json="otherData" />
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
import ServerLessID from "@side-panel/components/form/ServerLessID.vue";
import APIKey from "@side-panel/components/form/APIKey.vue";
import Keywords from "@side-panel/components/form/Keywords.vue";
import WidthOrHeight from "@side-panel/components/form/WidthOrHeight.vue";
import SubmitCancelButtons from "@side-panel/components/form/SubmitCancelButtons.vue";
import JsonResponse from "@side-panel/components/response/JsonResponse.vue";
import ImageResponse from "@side-panel/components/response/ImageResponse.vue";

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
	chromeMessage.on(EventName.FILL_POSITIVE_PROMPT, onFillKeyword);

	/** 创建上下文菜单 */
	chromeMessage.emit(EventName.CREATE_CONTEXT_MENUS, ContextMenuEnum.CREATE_SERVERLESS_COMFYUI);
}

/** 解除监听上下文菜单事件 */
function offContextMenu() {
	chromeMessage.off(EventName.FILL_SERVERLESS_ID, onFillServerlessId);
	chromeMessage.off(EventName.FILL_API_KEY, onFillApiKey);
	chromeMessage.off(EventName.FILL_POSITIVE_PROMPT, onFillKeyword);
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
.result {
	margin-top: 40px;
}
</style>
