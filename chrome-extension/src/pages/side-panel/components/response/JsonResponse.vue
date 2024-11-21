<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:41:40
 * @LastEditTime: 2024-11-21 09:54:08
 * @LastEditors: mulingyuer
 * @Description: json response
 * @FilePath: \chrome-extension\src\pages\side-panel\components\response\JsonResponse.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="json-response">
		<t-textarea
			:default-value="json"
			:placeholder="placeholder"
			:autosize="{ minRows, maxRows }"
			:value="json"
			readonly
		/>
		<div v-if="showCopy" class="json-response-copy">
			<t-button size="small" variant="outline" @click="onCopy">
				<template #icon><CopyIcon /></template>
				复制
			</t-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { CopyIcon } from "tdesign-icons-vue-next";
import { copyText } from "@/utils/tools";
import { MessagePlugin } from "tdesign-vue-next";

const props = defineProps({
	json: {
		type: String,
		required: true
	},
	placeholder: {
		type: String,
		default: "暂无内容"
	},
	minRows: {
		type: Number,
		default: 5
	},
	maxRows: {
		type: Number,
		default: 15
	},
	/** 是否显示复制按钮 */
	showCopy: {
		type: Boolean,
		default: false
	}
});

function onCopy() {
	if (typeof props.json === "string" && props.json.length <= 0) {
		MessagePlugin.warning("内容为空，无法复制");
		return;
	}
	copyText(props.json);
}
</script>

<style lang="scss" scoped>
.json-response-copy {
	margin-top: 10px;
	text-align: center;
}
</style>
