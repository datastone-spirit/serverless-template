<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:28:56
 * @LastEditTime: 2024-11-05 15:31:58
 * @LastEditors: mulingyuer
 * @Description: 宽高组件
 * @FilePath: \chrome-extension\src\side-panel\components\form\WidthOrHeight.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item>
		<t-row :gutter="16">
			<t-col :span="6">
				<t-form-item :label="widthLabel" :name="widthName" label-align="left" label-width="auto">
					<t-input v-model.number="widthValue" :placeholder="widthPlaceholder"></t-input>
				</t-form-item>
			</t-col>
			<t-col :span="6">
				<t-form-item :label="heightLabel" :name="heightName" label-align="left" label-width="auto">
					<t-input v-model.number="heightValue" :placeholder="heightPlaceholder"></t-input>
				</t-form-item>
			</t-col>
		</t-row>
	</t-form-item>
</template>

<script setup lang="ts">
defineProps({
	widthLabel: {
		type: String,
		default: "宽度"
	},
	widthName: {
		type: String
	},
	widthPlaceholder: {
		type: String,
		default: "请输入宽度"
	},
	heightLabel: {
		type: String,
		default: "高度"
	},
	heightName: {
		type: String
	},
	heightPlaceholder: {
		type: String,
		default: "请输入高度"
	}
});

const widthValue = defineModel("width", { type: Number, required: true });
const heightValue = defineModel("height", { type: Number, required: true });
</script>

<style scoped></style>
