<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 11:41:43
 * @LastEditTime: 2024-11-05 14:41:10
 * @LastEditors: mulingyuer
 * @Description: nav-bar-layout
 * @FilePath: \chrome-extension\src\side-panel\layout\nav-bar-layout.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="nav-bar-layout">
		<div class="nav-bar">
			<div class="nav-bar-left">
				<t-button
					class="nav-bar-left-btn"
					theme="default"
					size="large"
					variant="text"
					@click="onLeftClick"
				>
					<template #icon>
						<ChevronLeftIcon />
					</template>
					返回
				</t-button>
			</div>
		</div>
		<div class="nav-bar-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from "tdesign-icons-vue-next";

const router = useRouter();

function onLeftClick() {
	router.go(-1);
}
</script>

<style lang="scss" scoped>
.nav-bar-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
.nav-bar {
	height: 40px;
	background-color: #fff;
	display: flex;
	align-items: center;
}
.nav-bar-left {
	display: flex;
	align-items: center;
	margin-right: auto;
}
.nav-bar-left-btn {
	padding-left: 8px;
	padding-right: 8px;
}
.nav-bar-content {
	padding: 10px 10px 20px;
}
</style>
