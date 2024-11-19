<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:41:40
 * @LastEditTime: 2024-11-05 15:44:57
 * @LastEditors: mulingyuer
 * @Description: json response
 * @FilePath: \chrome-extension\src\side-panel\components\response\JsonResponse.vue
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
	</div>
</template>

<script setup lang="ts">
defineProps({
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
	}
});
</script>

<style lang="scss" scoped>
.json-response {
}
</style>
