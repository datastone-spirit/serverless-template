<!--
 * @Author: mulingyuer
 * @Date: 2024-11-18 17:08:36
 * @LastEditTime: 2024-11-20 11:17:52
 * @LastEditors: mulingyuer
 * @Description: 图片上传组件
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\ImageUpload.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-upload
			class="image-upload"
			ref="uploadRef"
			v-model="img"
			theme="image"
			accept="image/*"
			:show-thumbnail="true"
			:placeholder="placeholder"
			:draggable="draggable"
			:abridge-name="abridgeName"
			:request-method="requestMethod"
		>
		</t-upload>
	</t-form-item>
</template>

<script setup lang="ts">
import type { UploadFile, UploadInstanceFunctions, UploadProps } from "tdesign-vue-next";
import { fileToBlobUrl, releaseBlobUrl } from "@/utils/tools";

defineProps({
	label: {
		type: String,
		default: "图片上传"
	},
	name: {
		type: String
	},
	placeholder: {
		type: String,
		default: "点击上传图片"
	},
	/** 拖拽 */
	draggable: {
		type: Boolean,
		default: true
	},
	/** 文件名过长时，需要省略中间的文本，保留首尾文本。 */
	abridgeName: {
		type: Array as PropType<UploadProps["abridgeName"]>,
		default: () => [5, 6]
	}
});

const img = defineModel({ type: Array as PropType<UploadProps["value"]>, required: true });
const uploadRef = ref<UploadInstanceFunctions>();
let oldImgSrc: string | null = null;
function clearOldImgSrc() {
	if (!oldImgSrc) return;
	releaseBlobUrl(oldImgSrc);
	oldImgSrc = null;
}

const requestMethod: UploadProps["requestMethod"] = async (file: UploadFile) => {
	// 生成预览图
	clearOldImgSrc();
	oldImgSrc = fileToBlobUrl(file.raw!);

	return {
		status: "success",
		response: {
			url: oldImgSrc
		}
	};
};
</script>

<style lang="scss" scoped>
.image-upload {
	:deep(.t-image__loading) {
		display: none;
	}
}
</style>
