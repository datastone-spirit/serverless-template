/*
 * @Author: mulingyuer
 * @Date: 2024-11-05 10:51:07
 * @LastEditTime: 2024-12-02 10:28:26
 * @LastEditors: mulingyuer
 * @Description: 本地数据
 * @FilePath: \chrome-extension\src\pages\side-panel\views\home\data.ts
 * 怎么可能会有bug！！！
 */
import comfyuiServerlessImg from "@side-panel/assets/images/home/data/comfyui-serverless-img.png";
import sdxlText2imgImg from "@side-panel/assets/images/home/data/sdxlText2imgImg.png";
import cosyvoiceImg from "@side-panel/assets/images/home/data/cosyvoice.png";
import llamaVisionImg from "@side-panel/assets/images/home/data/llama3.2-vision.png";
import whisperImg from "@side-panel/assets/images/home/data/whisper.png";
import cogVideoImg from "@side-panel/assets/images/home/data/cog-video.png";
import ltxvImg from "@side-panel/assets/images/home/data/ltxv.gif";

export type List = Array<{
	name: string;
	description: string;
	detailUrl?: string;
	detailBtnText?: string;
	img: string;
	routerName: string;
}>;

export const HomeList: List = [
	{
		name: "comfyui-serverless",
		description:
			"封装ComfyUI成一个专属的文生图服务，视频教程：https://www.bilibili.com/video/BV1DQDHYLEzG/",
		detailUrl: "https://www.bilibili.com/video/BV1DQDHYLEzG",
		detailBtnText: "教程",
		img: comfyuiServerlessImg,
		routerName: "ServerlessComfyUI"
	},
	{
		name: "sdxl-text2img",
		description: "通过SDXL Base 模型进行文生图",
		detailUrl:
			"https://serverless.datastone.cn/sprite/app/tmpl/serverless-detail?id=23&pyType=serverlessOfficial",
		img: sdxlText2imgImg,
		routerName: "ServerlessSDXLText2Img"
	},
	{
		name: "whisper",
		description: "通过Whisper 实现语音转文字",
		detailUrl:
			"https://serverless.datastone.cn/sprite/app/tmpl/serverless-detail?id=2&pyType=serverlessOfficial",
		img: whisperImg,
		routerName: "ServerlessWhisper"
	},
	{
		name: "cosyvoice",
		description: "使用 CosyVoice 进行声音克隆",
		detailUrl:
			"https://serverless.datastone.cn/sprite/app/tmpl/serverless-detail?id=45&pyType=serverlessOfficial",
		img: cosyvoiceImg,
		routerName: "ServerlessCosyvoice"
	},
	{
		name: "llama3.2-vision",
		description: "使用 llama3.2 vision 模型实现一个OCR服务",
		detailUrl:
			"https://serverless.datastone.cn/sprite/app/tmpl/serverless-detail?id=46&pyType=serverlessOfficial",
		img: llamaVisionImg,
		routerName: "ServerlessLlamaVision"
	},
	{
		name: "LTX-Video",
		description: "使用LTX-Video进行文生视频制作",
		detailUrl:
			"https://serverless.datastone.cn/sprite/app/tmpl/serverless-detail?id=57&pyType=serverlessOfficial",
		img: ltxvImg,
		routerName: "ServerlessLtxVideo"
	}
	// {
	// 	name: "cog-video",
	// 	description: "使用Cog Video 进行文生视频制作",
	// 	img: cogVideoImg,
	// 	routerName: "ServerlessCogVideo"
	// }
];
