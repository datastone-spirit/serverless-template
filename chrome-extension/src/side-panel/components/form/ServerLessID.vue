<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:14:00
 * @LastEditTime: 2024-11-05 15:21:58
 * @LastEditors: mulingyuer
 * @Description: ServerLess ID
 * @FilePath: \chrome-extension\src\side-panel\components\form\ServerLessID.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-input v-model="value" :placeholder="placeholder"></t-input>
	</t-form-item>
</template>

<script setup lang="ts">
defineProps({
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
	}
});

const value = defineModel({ type: String, required: true });
</script>

<style scoped></style>
