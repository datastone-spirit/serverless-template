import logging
from typing import Any, Dict
from spirit_gpu import start, Env
import json
import base64
import ollama

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
        image_base64 = request_input.get('image_base64', '')
        image_content = request_input.get('image_content', '')
        role = request_input.get('role', 'user')

        if "," in image_base64:
            base64_data = image_base64.split(",")[1]
        else:
            base64_data = image_base64  # 如果没有前缀，直接使用原数据

        image_bytes = base64.b64decode(base64_data)

        response_ollama = ollama.chat(
            model='llama3.2-vision',
            messages=[{
                'role': role,
                'content': image_content,
                'images': [image_bytes]
            }]
        )

        # logging.info(f"Received request with prompt: {response_ollama}")

        response = {
            "data": response_ollama
        }
        
        return response

    return handler

# 启动应用程序
start({"handler": start_handler()})
