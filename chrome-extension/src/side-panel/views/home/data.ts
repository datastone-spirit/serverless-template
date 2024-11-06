/*
 * @Author: mulingyuer
 * @Date: 2024-11-05 10:51:07
 * @LastEditTime: 2024-11-06 11:57:39
 * @LastEditors: mulingyuer
 * @Description: 本地数据
 * @FilePath: \chrome-extension\src\side-panel\views\home\data.ts
 * 怎么可能会有bug！！！
 */
import comfyuiServerlessImg from "@side-panel/assets/images/home/data/comfyui-serverless-img.png";
import sdxlText2imgImg from "@side-panel/assets/images/home/data/sdxlText2imgImg.png";

export type List = Array<{
	id: number;
	name: string;
	description: string;
	dockerImage: string;
	detailUrl: string;
	img: string;
	routerName: string;
}>;

export const HomeList: List = [
	{
		id: 1,
		name: "comfyui-serverless",
		description: "comfyui-serverless",
		dockerImage: "comfyui-serverless:comfyui",
		detailUrl:
			"https://serverless.datastone.cn/sprite/app/tmpl/serverless-detail?id=40&pyType=serverlessUser",
		img: comfyuiServerlessImg,
		routerName: "ServerlessComfyUI"
	},
	{
		id: 2,
		name: "sdxl-text2img",
		description: "通过SDXL Base 模型进行文生图",
		dockerImage: "megaease/sd-serverless:v1",
		detailUrl:
			"https://serverless.datastone.cn/sprite/app/tmpl/serverless-detail?id=23&pyType=serverlessOfficial",
		img: sdxlText2imgImg,
		routerName: "ServerlessSDXLText2Img"
	}
];
