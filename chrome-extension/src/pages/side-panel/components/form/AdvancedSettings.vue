<!--
 * @Author: mulingyuer
 * @Date: 2024-11-26 10:54:05
 * @LastEditTime: 2024-11-26 10:58:25
 * @LastEditors: mulingyuer
 * @Description: 高级设置
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\AdvancedSettings.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item
		class="advanced-settings"
		:class="{ open: open }"
		:label="label"
		:label-align="labelAlign"
	>
		<t-switch v-model="open"></t-switch>
	</t-form-item>
	<template v-if="open">
		<slot></slot>
	</template>
</template>

<script setup lang="ts">
export interface AdvancedSettingsProps {
	label?: string;
	labelAlign?: "left" | "top" | "right";
}

withDefaults(defineProps<AdvancedSettingsProps>(), {
	label: "高级设置",
	labelAlign: "left"
});

const open = defineModel({ type: Boolean, required: true });
</script>

<style lang="scss" scoped>
.advanced-settings {
	&.open {
		margin-bottom: 0px;
	}
}
</style>
