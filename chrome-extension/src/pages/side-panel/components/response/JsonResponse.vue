<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:41:40
 * @LastEditTime: 2024-11-21 11:43:20
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
		<CopyBtn v-if="showCopy" class="json-response-copy" :content="json" />
	</div>
</template>

<script setup lang="ts">
import CopyBtn from "@side-panel/components/form/CopyBtn.vue";

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
</script>

<style lang="scss" scoped>
.json-response {
	position: relative;
}
.json-response-copy {
	position: absolute;
	top: 4px;
	right: 4px;
}
</style>
