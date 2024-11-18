<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:26:19
 * @LastEditTime: 2024-11-18 16:16:42
 * @LastEditors: mulingyuer
 * @Description: keywords
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\PositivePrompt.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-textarea
			v-model="positivePrompt"
			:placeholder="placeholder"
			:autosize="{ minRows, maxRows }"
		/>
	</t-form-item>
</template>

<script setup lang="ts">
import { chromeMessage, EventName, type EventCallback } from "@/utils/chrome-message";
import { useTextToImgStore } from "@side-panel/stores";

const { enableCache } = defineProps({
	label: {
		type: String,
		default: "提示词"
	},
	name: {
		type: String
	},
	placeholder: {
		type: String,
		default: "请输入提示词，英文逗号分隔"
	},
	minRows: {
		type: Number,
		default: 5
	},
	maxRows: {
		type: Number,
		default: 5
	},
	/** 默认从本地存储获取数据 */
	enableCache: {
		type: Boolean,
		default: true
	}
});

const positivePrompt = defineModel({ type: String, required: true });

const textToImgStore = useTextToImgStore();

/** 监听右键菜单 */
const listenContextMenu: EventCallback = (message) => {
	const { data } = message;
	if (!data) return;
	positivePrompt.value = data;
};

/** 创建右键菜单 */
function createContextMenu() {
	chromeMessage.on(EventName.FILL_POSITIVE_PROMPT, listenContextMenu);
	chromeMessage.emit(EventName.CREATE_POSITIVE_PROMPT_MENU);
}

/** 关闭右键菜单 */
function removeContextMenu() {
	chromeMessage.off(EventName.FILL_POSITIVE_PROMPT, listenContextMenu);
	chromeMessage.emit(EventName.CLOSE_POSITIVE_PROMPT_MENU);
}

/** 缓存数据 */
function saveData(str?: string) {
	let value = positivePrompt.value;
	if (typeof str === "string" && str.trim() !== "") {
		value = str.trim();
	}
	textToImgStore.setPositivePrompt(value);
}

onMounted(() => {
	createContextMenu();

	if (enableCache) {
		positivePrompt.value = textToImgStore.positivePrompt;
	}
});

onUnmounted(() => {
	removeContextMenu();
});

defineExpose({
	saveData
});
</script>

<style scoped></style>
