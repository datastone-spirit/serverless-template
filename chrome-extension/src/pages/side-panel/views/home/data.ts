/*
 * @Author: mulingyuer
 * @Date: 2024-11-05 10:51:07
 * @LastEditTime: 2024-11-18 11:39:08
 * @LastEditors: mulingyuer
 * @Description: 本地数据
 * @FilePath: \chrome-extension\src\pages\side-panel\views\home\data.ts
 * 怎么可能会有bug！！！
 */
import comfyuiServerlessImg from "@side-panel/assets/images/home/data/comfyui-serverless-img.png";
import sdxlText2imgImg from "@side-panel/assets/images/home/data/sdxlText2imgImg.png";
import ollamaOCRImg from "@side-panel/assets/images/home/data/ollama-ocr.png";

export type List = Array<{
	id: number;
	name: string;
	description: string;
	detailUrl?: string;
	detailBtnText?: string;
	img: string;
	routerName: string;
}>;

export const HomeList: List = [
	{
		id: 1,
		name: "comfyui-serverless",
		description:
			"封装ComfyUI成一个专属的文生图服务，视频教程：https://www.bilibili.com/video/BV1DQDHYLEzG/",
		detailUrl: "https://www.bilibili.com/video/BV1DQDHYLEzG",
		detailBtnText: "教程",
		img: comfyuiServerlessImg,
		routerName: "ServerlessComfyUI"
	},
	{
		id: 2,
		name: "sdxl-text2img",
		description: "通过SDXL Base 模型进行文生图",
		detailUrl:
			"https://serverless.datastone.cn/sprite/app/tmpl/serverless-detail?id=23&pyType=serverlessOfficial",
		img: sdxlText2imgImg,
		routerName: "ServerlessSDXLText2Img"
	},
	{
		id: 3,
		name: "ollama-OCR",
		description:
			"ollama-OCR 是一个基于Serverless架构的文字识别服务，可以识别图片中的文字，并返回识别结果。",
		detailUrl: "",
		img: ollamaOCRImg,
		routerName: "ServerlessOllamaOCR"
	}
];
