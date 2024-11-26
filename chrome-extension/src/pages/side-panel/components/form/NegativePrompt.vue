<!--
 * @Author: mulingyuer
 * @Date: 2024-11-26 11:03:03
 * @LastEditTime: 2024-11-26 11:17:51
 * @LastEditors: mulingyuer
 * @Description: 负面提示词
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\NegativePrompt.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-textarea
			v-model="negativePrompt"
			:placeholder="placeholder"
			:autosize="{ minRows, maxRows }"
		/>
	</t-form-item>
</template>

<script setup lang="ts">
import { chromeMessage, EventName, type EventCallback } from "@/utils/chrome-message";

defineProps({
	label: {
		type: String,
		default: "反向提示词"
	},
	name: {
		type: String
	},
	placeholder: {
		type: String,
		default: "请输入反向提示词，英文逗号分隔"
	},
	minRows: {
		type: Number,
		default: 5
	},
	maxRows: {
		type: Number,
		default: 5
	}
});

const negativePrompt = defineModel({ type: String, required: true });

/** 监听右键菜单 */
const listenContextMenu: EventCallback = (message) => {
	const { data } = message;
	if (!data) return;
	negativePrompt.value = data;
};

/** 创建右键菜单 */
function createContextMenu() {
	chromeMessage.on(EventName.FILL_NEGATIVE_PROMPT, listenContextMenu);
	chromeMessage.emit(EventName.CREATE_NEGATIVE_PROMPT_MENU);
}

/** 关闭右键菜单 */
function removeContextMenu() {
	chromeMessage.off(EventName.FILL_NEGATIVE_PROMPT, listenContextMenu);
	chromeMessage.emit(EventName.CLOSE_NEGATIVE_PROMPT_MENU);
}

onMounted(() => {
	createContextMenu();
});

onUnmounted(() => {
	removeContextMenu();
});
</script>

<style scoped></style>
