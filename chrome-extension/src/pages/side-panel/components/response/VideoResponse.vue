<!--
 * @Author: mulingyuer
 * @Date: 2024-11-27 16:10:38
 * @LastEditTime: 2024-11-29 10:28:37
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
			<t-button class="video-response-btn" size="small" variant="outline" @click="onDownload">
				<template #icon><DownloadIcon /></template>
				下载文件
			</t-button>
		</div>
		<t-empty v-else />
	</div>
</template>

<script setup lang="ts">
import { DownloadIcon } from "tdesign-icons-vue-next";
import { downloadBase64File } from "@/utils/tools";

export interface VideoResponseProps {
	src: string;
	/** 是否显示下载 */
	showDownload?: boolean;
	/** 下载文件名 */
	downloadFileName?: string;
}

const props = withDefaults(defineProps<VideoResponseProps>(), {
	showDownload: true,
	downloadFileName: "video.mp4"
});

const show = computed(() => {
	if (typeof props.src === "string" && props.src.trim() !== "") {
		return true;
	}
	return false;
});

function onDownload() {
	downloadBase64File(props.src, props.downloadFileName);
}
</script>

<style lang="scss" scoped>
.video-response {
	display: flex;
	justify-content: center;
	align-items: center;
}
.video-response-content {
	width: 100%;
	text-align: center;
}
.video-response-video {
	width: 100%;
	height: auto;
}
.video-response-btn {
	margin-top: 10px;
}
</style>
