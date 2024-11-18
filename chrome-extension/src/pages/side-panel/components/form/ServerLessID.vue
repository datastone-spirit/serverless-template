<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:14:00
 * @LastEditTime: 2024-11-18 16:06:45
 * @LastEditors: mulingyuer
 * @Description: ServerLess ID
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\ServerLessID.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-input v-model="serverLessID" :placeholder="placeholder"></t-input>
	</t-form-item>
</template>

<script setup lang="ts">
import { chromeMessage, EventName, type EventCallback } from "@/utils/chrome-message";
import { useServerlessStore } from "@side-panel/stores";

const { enableCache } = defineProps({
	label: {
		type: String,
		default: "ServerLess ID"
	},
	name: {
		type: String
	},
	placeholder: {
		type: String,
		default: "请输入ServerLess ID"
	},
	/** 默认从本地存储获取数据 */
	enableCache: {
		type: Boolean,
		default: true
	}
});

const serverLessID = defineModel({ type: String, required: true });

const serverlessStore = useServerlessStore();

/** 监听右键菜单 */
const listenContextMenu: EventCallback = (message) => {
	const { data } = message;
	if (!data) return;
	serverLessID.value = data;
};

/** 创建右键菜单 */
function createContextMenu() {
	chromeMessage.on(EventName.FILL_SERVERLESS_ID, listenContextMenu);
	chromeMessage.emit(EventName.CREATE_SERVERLESS_ID_MENU);
}

/** 关闭右键菜单 */
function removeContextMenu() {
	chromeMessage.off(EventName.FILL_SERVERLESS_ID, listenContextMenu);
	chromeMessage.emit(EventName.CLOSE_SERVERLESS_ID_MENU);
}

/** 缓存数据 */
function saveData(str?: string) {
	let value = serverLessID.value;
	if (typeof str === "string" && str.trim() !== "") {
		value = str.trim();
	}
	serverlessStore.setServerlessId(value);
}

onMounted(() => {
	createContextMenu();

	if (enableCache) {
		serverLessID.value = serverlessStore.serverlessId;
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
