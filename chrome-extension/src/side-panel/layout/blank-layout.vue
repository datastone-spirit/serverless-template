<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 11:42:19
 * @LastEditTime: 2024-11-05 11:52:04
 * @LastEditors: mulingyuer
 * @Description: 空白布局
 * @FilePath: \chrome-extension\src\side-panel\layout\blank-layout.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="blank-layout">
		<router-view></router-view>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.blank-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	padding: 20px 10px;
}
</style>
