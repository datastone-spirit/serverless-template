<!--
 * @Author: mulingyuer
 * @Date: 2024-11-21 08:56:34
 * @LastEditTime: 2024-11-22 16:23:44
 * @LastEditors: mulingyuer
 * @Description: md转html响应内容组件
 * @FilePath: \chrome-extension\src\pages\side-panel\components\response\mdToHtmlResponse\index.vue
 * 怎么可能会有bug！！！
-->
<template>
	<div class="md-to-html-response">
		<div v-show="show" class="markdown-wrapper">
			<CopyBtn class="md-copy-btn" :content="shadowRoot" />
			<div class="markdown-body" ref="markdownBodyRef"></div>
		</div>
		<t-empty class="markdown-empty" v-show="!show" />
	</div>
</template>

<script setup lang="ts">
import CopyBtn from "@side-panel/components/form/CopyBtn.vue";
import { marked } from "marked";
import GithubStyle from "./github-markdown.css?raw";

const props = defineProps({
	markdown: {
		type: String,
		required: true
	},
	/** 是否显示复制按钮 */
	showCopy: {
		type: Boolean,
		default: true
	}
});

const markdownBodyRef = ref<HTMLDivElement>();
const shadowRoot = ref<ShadowRoot>();

const show = computed(() => {
	return typeof props.markdown === "string" && props.markdown.trim() !== "";
});

function renderShadowDom() {
	if (!markdownBodyRef.value) return;
	if (!markdownBodyRef.value.shadowRoot) {
		// 创建root shadow dom
		shadowRoot.value = markdownBodyRef.value.attachShadow({ mode: "open" });
	} else {
		shadowRoot.value!.innerHTML = ""; // 清空shadow dom
	}

	// 渲染markdown
	const html = marked.parse(props.markdown, { async: false });
	shadowRoot.value!.innerHTML = generateHtmlTemplate(html);
}

function generateHtmlTemplate(html: string) {
	return `
    <style>
      :host {
        all: initial; 
        font-size: 16px;
      }
			${GithubStyle}
    </style>
		<div class="markdown-body">${html}</div>
  `;
}

onMounted(() => {
	renderShadowDom();
});

watch(show, () => {
	renderShadowDom();
});
</script>

<style lang="scss" scoped>
.md-to-html-response {
	border-width: 1px;
	border-style: solid;
	border-radius: var(--td-radius-default);
	border-color: var(--td-border-level-2-color);
	min-height: 150px;
	display: flex;
	flex-direction: column;
}
.markdown-wrapper {
	min-height: 150px;
	max-height: 800px;
	overflow: overlay;
	padding: 20px 8px;
	@include google-scrollbar();
	position: relative;
}
.md-copy-btn {
	position: absolute;
	top: 4px;
	right: 4px;
}
.markdown-empty {
	margin: auto;
}
</style>
