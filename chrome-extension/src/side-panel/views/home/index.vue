<!--
 * @Author: mulingyuer
 * @Date: 2024-11-05 09:44:26
 * @LastEditTime: 2024-11-06 14:45:03
 * @LastEditors: mulingyuer
 * @Description: 首页
 * @FilePath: \chrome-extension\src\side-panel\views\home\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="home">
		<div class="home-list">
			<t-row :gutter="[12, 12]">
				<t-col v-for="item in list" :key="item.id" :xs="12" :sm="6" :lg="4">
					<div class="home-list-item">
						<div
							class="home-list-item-bg"
							:style="{ 'background-image': `url(${item.img})` }"
						></div>
						<div class="home-list-item-content">
							<h2 class="home-list-item-title">{{ item.name }}</h2>
							<p class="home-list-item-docker-image">容器镜像：{{ item.dockerImage }}</p>
							<p class="home-list-item-description">{{ item.description }}</p>
							<div class="home-list-item-footer">
								<t-space :size="8">
									<t-button variant="outline" size="medium" @click="onViewDetail(item)">
										详情
									</t-button>
									<t-button theme="primary" size="medium" @click="onRunTester(item)">
										<template #icon>
											<PlayCircleIcon />
										</template>
										测试
									</t-button>
								</t-space>
							</div>
						</div>
					</div>
				</t-col>
			</t-row>
		</div>
	</div>
</template>

<script setup lang="ts">
import { HomeList } from "./data";
import type { List } from "./data";
import { chromeMessage, EventName } from "@/utils/chrome-message";
import { PlayCircleIcon } from "tdesign-icons-vue-next";

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
	height: 170px;
	position: relative;
}

.home-list-item-bg {
	height: 100%;
	background-repeat: no-repeat;
	background-position: right center;
	background-size: cover;
	background-color: #000;
	border-radius: 8px;
	position: relative;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(-90deg, transparent, rgba(0, 0, 0, 0.76) 40%, #000000 100%);
		border-radius: 8px;
	}
}
.home-list-item-content {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 12px;
}
.home-list-item-title {
	margin-top: 12px;
	font-size: 20px;
	font-weight: bold;
	color: #fff;
	line-height: 1.3;
	@include text-ellipsis();
}
.home-list-item-docker-image {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.5);
}
.home-list-item-description {
	margin-top: 10px;
	font-size: 16px;
	color: rgba(255, 255, 255, 0.8);
	@include ellipsis-rows(2);
}
.home-list-item-footer {
	position: absolute;
	right: 0;
	bottom: 0;
	background-image: url("@side-panel/assets/images/home/item-footer-bg.svg");
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: right bottom;
	width: 210px;
	height: 44px;
	padding-top: 13px;
	text-align: right;
}
</style>
