<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 09:44:26
 * @LastEditTime: 2024-11-05 11:37:17
 * @LastEditors: mulingyuer
 * @Description: 首页
 * @FilePath: \chrome-extension\src\side-panel\views\home\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="home">
		<div class="home-list">
			<div v-for="item in list" :key="item.id" class="home-list-item">
				<div class="home-list-item-head">
					<div class="home-list-item-img-wrapper">
						<t-image class="home-list-item-img" :src="item.img" fit="cover" shape="circle" lazy />
					</div>
					<div class="home-list-item-info">
						<h2 class="home-list-item-title">{{ item.name }}</h2>
						<p class="home-list-item-docker-image">{{ item.dockerImage }}</p>
					</div>
				</div>
				<div class="home-list-item-body">
					<p class="home-list-item-description">{{ item.description }}</p>
				</div>
				<div class="home-list-item-footer">
					<t-space :size="8">
						<t-button variant="outline" shape="round" size="medium" @click="onViewDetail(item)"
							>查看详情</t-button
						>
						<t-button theme="primary" shape="round" size="medium" @click="onRunTester(item)"
							>测试运行</t-button
						>
					</t-space>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { HomeList } from "./data";
import type { List } from "./data";
import { chromeMessage, EventName } from "@/utils/chrome-message";

const router = useRouter();

const list = ref<List>(HomeList);

/** 运行测试 */
function onRunTester(item: List[number]) {
	router.push({ name: item.routerName });
}

/** 查看详情 */
function onViewDetail(item: List[number]) {
	chromeMessage.emit(EventName.OPEN_NEW_PAGE, item.detailUrl);
}
</script>

<style lang="scss" scoped>
.home-list-item {
	padding: 12px;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.1);
	transition: box-shadow 0.2s;
	& + & {
		margin-top: 12px;
	}
	&:hover {
		box-shadow: 0px 0px 10px 0px rgba(0, 163, 137, 0.6);
	}
}
.home-list-item-head {
	display: flex;
	align-items: center;
}
.home-list-item-img-wrapper {
	width: 70px;
	height: 70px;
	flex-shrink: 0;
	margin-right: 8px;
}
.home-list-item-img {
	width: 100%;
	height: 100%;
}
.home-list-item-title {
	font-size: 18px;
	font-weight: bold;
	color: #3d3a39;
	@include text-ellipsis();
}
.home-list-item-docker-image {
	margin-top: 4px;
	background-color: #f5f5f5;
	border-radius: 9999px;
	padding: 4px 8px;
	font-size: 14px;
	color: #3d3a39;
	@include text-ellipsis();
}
.home-list-item-body {
	margin-top: 15px;
}
.home-list-item-description {
	font-size: 16px;
	color: #3d3a39;
	line-height: 1.2;
	@include ellipsis-rows(2);
}
.home-list-item-footer {
	margin-top: 12px;
	display: flex;
	justify-content: right;
}
</style>
