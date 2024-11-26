<!--
 * @Author: mulingyuer
 * @Date: 2024-11-26 15:35:25
 * @LastEditTime: 2024-11-26 16:05:37
 * @LastEditors: mulingyuer
 * @Description: 推理步骤数量
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\Steps.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-slider v-model="steps" :min="min" :max="max" :step="step" />
		<t-input-number
			class="steps-input"
			v-model="steps"
			theme="column"
			:min="min"
			:max="max"
			:step="step"
			placeholder=""
		/>
	</t-form-item>
</template>

<script setup lang="ts">
defineProps({
	label: {
		type: String,
		default: "推理步骤"
	},
	name: {
		type: String
	},
	/** 最小值 */
	min: {
		type: Number,
		default: 1
	},
	/** 最大值 */
	max: {
		type: Number,
		default: 100
	},
	/** 步进值 */
	step: {
		type: Number,
		default: 1
	}
});

const steps = defineModel({ type: Number, required: true });
</script>

<style lang="scss" scoped>
.steps-input {
	margin-left: 20px;
	flex-shrink: 0;
	width: 80px;
}
</style>
