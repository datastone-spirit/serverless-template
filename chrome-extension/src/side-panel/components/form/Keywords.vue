<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:26:19
 * @LastEditTime: 2024-11-05 15:27:34
 * @LastEditors: mulingyuer
 * @Description: keywords
 * @FilePath: \chrome-extension\src\side-panel\components\form\Keywords.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-textarea v-model="value" :placeholder="placeholder" :autosize="{ minRows, maxRows }" />
	</t-form-item>
</template>

<script setup lang="ts">
defineProps({
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
	}
});

const value = defineModel({ type: String, required: true });
</script>

<style scoped></style>
