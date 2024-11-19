<!--
 * @Author: mulingyuer
 * @Date: 2024-11-19 10:08:19
 * @LastEditTime: 2024-11-19 10:33:29
 * @LastEditors: mulingyuer
 * @Description: 文件上传组件
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\FileUpload.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-upload
			v-model="files"
			theme="file"
			:accept="accept"
			:multiple="multiple"
			:placeholder="placeholder"
			:draggable="draggable"
			:request-method="requestMethod"
		/>
	</t-form-item>
</template>

<script setup lang="ts">
import dayjs from "@/utils/dayjs";
import type { UploadProps } from "tdesign-vue-next";

defineProps({
	label: {
		type: String,
		default: "文件上传"
	},
	name: {
		type: String
	},
	placeholder: {
		type: String,
		default: "点击上传文件"
	},
	/** 多文件上传 */
	multiple: {
		type: Boolean,
		default: false
	},
	/** 拖拽 */
	draggable: {
		type: Boolean,
		default: true
	},
	/** 文件类型限制 */
	accept: {
		type: String,
		default: ""
	}
});

const files = defineModel({ type: Array as PropType<UploadProps["value"]>, required: true });

const requestMethod: UploadProps["requestMethod"] = async (files) => {
	return {
		status: "success",
		response: {
			files: Array.isArray(files) ? files : [{ ...files, uploadTime: dayjs().format("YYYY-MM-DD") }]
		}
	};
};
</script>

<style scoped></style>
