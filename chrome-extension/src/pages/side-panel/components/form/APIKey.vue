<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:23:37
 * @LastEditTime: 2024-11-05 15:24:53
 * @LastEditors: mulingyuer
 * @Description: api key
 * @FilePath: \chrome-extension\src\side-panel\components\form\APIKey.vue
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
		default: "API key"
	},
	name: {
		type: String
	},
	placeholder: {
		type: String,
		default: "请输入API key"
	}
});

const value = defineModel({ type: String, required: true });
</script>

<style scoped></style>
