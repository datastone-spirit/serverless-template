<!--
 * @Author: mulingyuer
 * @Date: 2024-11-18 17:08:36
 * @LastEditTime: 2024-11-18 17:50:12
 * @LastEditors: mulingyuer
 * @Description: 图片上传组件
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\ImageUpload.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item :label="label" :name="name">
		<t-upload
			ref="uploadRef1"
			v-model="img"
			theme="image"
			accept="image/*"
			:multiple="multiple"
			:placeholder="placeholder"
			:draggable="draggable"
			:request-method="requestMethod"
		>
		</t-upload>
	</t-form-item>
</template>

<script setup lang="ts">
import type { UploadProps } from "tdesign-vue-next";
import dayjs from "@/utils/dayjs";

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
	/** 多文件上传 */
	multiple: {
		type: Boolean,
		default: false
	},
	/** 拖拽 */
	draggable: {
		type: Boolean,
		default: true
	}
});

const img = defineModel({ type: Array as PropType<UploadProps["value"]>, required: true });

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
