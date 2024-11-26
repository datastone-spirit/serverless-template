<!--
 * @Author: mulingyuer
 * @Date: 2024-11-26 11:38:13
 * @LastEditTime: 2024-11-26 16:28:53
 * @LastEditors: mulingyuer
 * @Description: 种子
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\Seed.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-input v-model.number="seed" :placeholder="placeholder"></t-input>
		<t-button class="seed-btn" variant="outline" theme="default" @click="onGenerateSeed">
			<template #icon><RefreshIcon /></template>
		</t-button>
	</t-form-item>
</template>

<script setup lang="ts">
import { RefreshIcon } from "tdesign-icons-vue-next";

defineProps({
	label: {
		type: String,
		default: "种子"
	},
	name: {
		type: String
	},
	placeholder: {
		type: String,
		default: "请输入种子"
	}
});

const seed = defineModel({ type: [String, Number] as PropType<string | number>, required: true });

function onGenerateSeed() {
	const min = 1;
	const max = Math.pow(2, 32); // 2^32

	const randomSeed = Math.floor(Math.random() * (max - min + 1)) + min;

	seed.value = randomSeed;
}
</script>

<style lang="scss" scoped>
.seed-btn {
	margin-left: 10px;
}
</style>
