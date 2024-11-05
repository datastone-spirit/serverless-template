<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 15:34:31
 * @LastEditTime: 2024-11-05 15:39:08
 * @LastEditors: mulingyuer
 * @Description: 提交和取消按钮
 * @FilePath: \chrome-extension\src\side-panel\components\form\SubmitCancelButtons.vue
 * 怎么可能会有bug！！！
-->
<template>
	<t-form-item>
		<t-row class="btn-row" :gutter="8">
			<t-col :span="9">
				<t-button theme="primary" type="submit" size="large" block :loading="loading">
					{{ loading ? loadingText : submitText }}
				</t-button>
			</t-col>
			<t-col :span="3">
				<t-button theme="default" size="large" block @click="onCancel">{{ cancelText }}</t-button>
			</t-col>
		</t-row>
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
.btn-row {
	width: 100%;
}
</style>
