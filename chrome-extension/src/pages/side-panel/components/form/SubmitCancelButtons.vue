<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:34:31
 * @LastEditTime: 2024-11-26 16:55:00
 * @LastEditors: mulingyuer
 * @Description: 提交和取消按钮
 * @FilePath: \chrome-extension\src\pages\side-panel\components\form\SubmitCancelButtons.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item>
		<t-button theme="primary" type="submit" size="large" block :loading="loading">
			{{ loading ? loadingText : submitText }}
		</t-button>
		<t-button class="cancel-btn" theme="default" size="large" block @click="onCancel">
			{{ cancelText }}
		</t-button>
	</t-form-item>
</template>

<script setup lang="ts">
defineProps({
	loading: {
		type: Boolean,
		default: false
	},
	loadingText: {
		type: String,
		default: "正在请求"
	},
	submitText: {
		type: String,
		default: "发起请求"
	},
	cancelText: {
		type: String,
		default: "取消"
	}
});
const emits = defineEmits<{
	onCancel: [];
}>();

function onCancel() {
	emits("onCancel");
}
</script>

<style lang="scss" scoped>
.cancel-btn {
	width: 30%;
	margin-left: 12px;
}
</style>
