<!--
 * @Author: mulingyuer
 * @Date: 2024-10-28 16:58:06
 * @LastEditTime: 2024-11-05 16:11:54
 * @LastEditors: mulingyuer
 * @Description: app
 * @FilePath: \chrome-extension\src\side-panel\App.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="side-panel">
		<router-view>
			<template #default="{ Component, route }">
				<transition name="fade-slide" mode="out-in" appear>
					<component :is="Component" :key="route.fullPath" />
				</transition>
			</template>
		</router-view>
	</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.side-panel {
	--transition-fade-slide-duration: 0.15s;
}
</style>
