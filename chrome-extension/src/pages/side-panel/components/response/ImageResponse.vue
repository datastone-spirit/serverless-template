<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:48:10
 * @LastEditTime: 2024-11-05 15:55:05
 * @LastEditors: mulingyuer
 * @Description: 图片响应
 * @FilePath: \chrome-extension\src\side-panel\components\response\ImageResponse.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="image-response">
		<div class="image-response-preview">
			<t-image
				v-if="show"
				class="image-response-img"
				:src="src"
				fit="contain"
				:overlay-content="renderMask"
				overlay-trigger="hover"
				@click="onViewImage"
			/>
			<t-empty v-else />
		</div>
	</div>
</template>

<script setup lang="ts">
import { chromeMessage, EventName } from "@/utils/chrome-message";
import type { ImageProps } from "tdesign-vue-next";

const props = defineProps({
	src: {
		type: String,
		required: true
	},
	fit: {
		type: String as PropType<"fill" | "none" | "contain" | "cover" | "scale-down">,
		default: "contain"
	}
});

const show = computed(() => {
	if (typeof props.src === "string" && props.src.trim() !== "") {
		return true;
	}
	return false;
});

const renderMask: ImageProps["overlayContent"] = () => {
	return h(
		"div",
		{
			style: {
				background: "rgba(0,0,0,.4)",
				color: "#fff",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "16px"
			}
		},
		["点击查看大图"]
	);
};

/** 查看大图 */
function onViewImage() {
	chromeMessage.emit(EventName.OPEN_NEW_PAGE, props.src);
}
</script>

<style lang="scss" scoped>
.image-response {
	position: relative;
	&::before {
		content: "";
		padding-top: 70%;
		display: block;
	}
}
.image-response-preview {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	border-width: 1px;
	border-style: solid;
	border-radius: var(--td-radius-default);
	border-color: var(--td-border-level-2-color);
	display: flex;
	justify-content: center;
	align-items: center;
}
.image-response-img {
	width: 100%;
	height: 100%;
}
</style>
