<!--
 * @Author: mulingyuer
 * @Date: 2024-11-19 11:18:01
 * @LastEditTime: 2024-11-19 11:55:04
 * @LastEditors: mulingyuer
 * @Description: 音乐响应组件
 * @FilePath: \chrome-extension\src\pages\side-panel\components\response\AudioResponse.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="audio-response">
		<div v-if="show" class="audio-player-wrapper">
			<audio class="audio-player" :src="src" controls></audio>
			<t-button class="audio-download-btn" size="small" variant="outline" @click="onDownload">
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

const props = defineProps({
	src: {
		type: String,
		required: true
	},
	/** 是否显示下载 */
	showDownload: {
		type: Boolean,
		default: true
	},
	/** 下载文件名 */
	downloadFileName: {
		type: String,
		default: "audio.mp3"
	}
});

const show = computed(() => {
	return typeof props.src === "string" && props.src.trim() !== "";
});

function onDownload() {
	downloadBase64File(props.src, props.downloadFileName);
}
</script>

<style lang="scss" scoped>
.audio-player {
	width: 100%;
}
.audio-player-wrapper {
	text-align: center;
}
.audio-download-btn {
	margin-top: 10px;
}
</style>
