<!--
 * @Author: mulingyuer
 * @Date: 2024-11-27 16:10:38
 * @LastEditTime: 2024-11-27 16:28:35
 * @LastEditors: mulingyuer
 * @Description: 视频响应组件
 * @FilePath: \chrome-extension\src\pages\side-panel\components\response\VideoResponse.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="video-response">
		<div v-if="show" class="video-response-content">
			<video
				class="video-response-video"
				controls
				autoplay
				loop
				preload="metadata"
				:src="src"
			></video>
		</div>
		<t-empty v-else />
	</div>
</template>

<script setup lang="ts">
export interface VideoResponseProps {
	src: string;
}

const props = defineProps<VideoResponseProps>();

const show = computed(() => {
	if (typeof props.src === "string" && props.src.trim() !== "") {
		return true;
	}
	return false;
});
</script>

<style lang="scss" scoped>
.video-response {
	border-width: 1px;
	border-style: solid;
	border-radius: var(--td-radius-default);
	border-color: var(--td-border-level-2-color);
	min-height: 150px;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.video-response-content {
	width: 100%;
}
.video-response-video {
	width: 100%;
	height: auto;
}
</style>
