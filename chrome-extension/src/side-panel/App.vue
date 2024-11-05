<!--
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:58:06
 * @LastEditTime: 2024-11-01 16:53:30
 * @LastEditors: mulingyuer
 * @Description: app
 * @FilePath: \serverless-api-tester\src\side-panel\App.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="side-panel">
		<ServerlessComfyui />
	</div>
</template>

<script setup lang="ts">
import ServerlessComfyui from "@side-panel/components/ServerlessComfyui/index.vue";
</script>

<style lang="scss" scoped>
.side-panel {
	padding: 20px 10px;
}
</style>
