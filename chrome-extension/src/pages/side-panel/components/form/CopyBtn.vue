<!--
 * @Author: mulingyuer
 * @Date: 2024-11-21 11:08:50
 * @LastEditTime: 2024-11-21 11:34:15
 * @LastEditors: mulingyuer
 * @Description: 复制按钮
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\CopyBtn.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-button class="copy-btn" size="small" variant="outline" @click="onCopy">
		<template v-if="showIcon" #icon><CopyIcon /></template>
		<template v-if="showText">{{ text }}</template>
	</t-button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "tdesign-vue-next";
import { CopyIcon } from "tdesign-icons-vue-next";
import { MessagePlugin } from "tdesign-vue-next";
import { copy } from "@/utils/tools";

export interface CopyBtnProps {
	/** 按钮形式 */
	variant?: ButtonProps["variant"];
	/** 按钮尺寸 */
	size?: ButtonProps["size"];
	/** 是否显示图标 */
	showIcon?: boolean;
	/** 是否显示文字 */
	showText?: boolean;
	/** 按钮文字 */
	text?: string;
	/** 复制内容 */
	content: string | HTMLElement | ShadowRoot | undefined | null;
}

const props = withDefaults(defineProps<CopyBtnProps>(), {
	variant: "outline",
	size: "small",
	showIcon: true,
	showText: false,
	text: "复制"
});

function onCopy() {
	const isEmpty = props.content === "" || props.content === undefined || props.content === null;
	if (isEmpty) {
		MessagePlugin.warning("内容为空，无法复制");
		return;
	}

	copy(props.content);
}
</script>

<style lang="scss" scoped>
.copy-btn {
	color: var(--td-text-color-secondary);
}
</style>
