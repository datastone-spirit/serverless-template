import os
import logging
from typing import Any, Dict
from spirit_gpu import start, Env
import json
import base64
import tempfile
import torchaudio
import torch
import ollama
import requests

def config_logging():
    console = logging.StreamHandler()
    console.setLevel(logging.DEBUG)
    logging.basicConfig(level=logging.INFO, 
                        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', 
                        datefmt='%Y-%m-%d %H:%M:%S', 
                        handlers=[console])

def start_handler():
    config_logging()
    
    def handler(request: Dict[str, Any], _: Env):
        request_input = request.get("input", {})

        response_image = requests.get('https://img2.baidu.com/it/u=2241193265,2791755422&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1082')
        logging.info(f"1111111: {response_image}")
        if response_image.status_code == 200:
            image_bytes = response_image.content  # 获取图片的字节内容
        else:
            raise Exception(f"Failed to download image from. Status code: {response.status_code}")

        response_ollama = ollama.chat(
            model='llama3.2-vision',
            messages=[{
                'role': 'user',
                'content': 'Extract all text from this image, including handwritten and printed text.',
                'images': [image_bytes]
            }]
        )

        logging.info(f"Received request with prompt: {response_ollama}")

        # 获取并解析 Base64 编码的音频和文本
        prompt = json.loads(request_input.get("prompt"))
        # 音频base64
        base64_audio = prompt.get("audio_base64")
        # 需生成文案语音
        output_text = prompt.get("output_text")
        # 原音频文案
        origin_audio_text = prompt.get("origin_audio_text")

        # 实例化ComfyUIClient
        
        logging.info(f"Received request with prompt: {prompt}")


        # 构造响应
        response = {
            "data": response_ollama
        }
        
        return response

    return handler

# 启动应用程序
start({"handler": start_handler()})
