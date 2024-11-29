
from typing import Any, Dict
import os
import logging
from spirit_gpu import start, logger
from spirit_gpu.env import Env
from comfyui_client import ComfyUIClient
import uuid
from spirit_generated_model import RequestInput
from prompt import prompt_text
from typing import List
import json
import base64

def config_logging():
    console = logging.StreamHandler()
    console.setLevel(logging.DEBUG)
    logging.basicConfig(level=logging.INFO, 
                        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', 
                        datefmt='%Y-%m-%d %H:%M:%S', 
                        handlers=[console])

def mp4_to_base64(file_path: str) -> str:
    try:
        # 读取 MP4 文件的二进制数据
        with open(file_path, "rb") as mp4_file:
            mp4_data = mp4_file.read()
        
        # 将二进制数据转换为 Base64 编码
        base64_str = base64.b64encode(mp4_data).decode('utf-8')
        
        return base64_str
    except Exception as e:
        print(f"Error encoding MP4 to Base64: {e}")
        return None

def create_prompt(prompt_obj: dict):

    prompt = json.loads(prompt_text)

    # node ids which will be changed during the prompt creation
    positive_input_node = '6'
    negative_input_node = '7'
    video_node = '70'
    steps_input_node = '71'
    seed_input_node = '72'
    logger.info(f"create_prompt------------ {prompt_obj}")
    prompt[positive_input_node]["inputs"]["text"] = prompt_obj.get('positive', '')
    prompt[negative_input_node]["inputs"]["text"] = prompt_obj.get('negative', '')
    prompt[video_node]["inputs"]["width"] = prompt_obj.get('videoWidth', '')
    prompt[video_node]["inputs"]["height"] = prompt_obj.get('videoHeight', '')
    prompt[steps_input_node]["inputs"]["steps"] = prompt_obj.get('steps', '')
    prompt[seed_input_node]["inputs"]["noise_seed"] = prompt_obj.get('seed', '')
    prompt[seed_input_node]["inputs"]["cfg"] = prompt_obj.get('cfg', '7.5')

    return prompt

def process_video(data_list: List[str]):
    base64_videos = []
    logger.info(f"process_video data_list {data_list}")

    for item in data_list:
        logger.info(f"json load before {item}")
        parsed_data = json.loads(item)
        logger.info(f"json load after {parsed_data}")

        if parsed_data.get("type") == "executed" and "output" in parsed_data.get("data", {}):
            if parsed_data["data"]["output"]["gifs"]:
                output_data = parsed_data["data"]["output"]["gifs"]

                for video_info in output_data:
                    filename = video_info["filename"]
                    subfolder = video_info["subfolder"]

                    video_path = os.path.join(subfolder,'output', filename)
                    logger.info(f"video_path: {video_path}")

                    base64_str = mp4_to_base64(video_path)
                    base64_videos.append(base64_str)                
    
    return base64_videos

def get_request_input(request: Dict[str, Any]) -> RequestInput:
    logger.info(f"get_request_input------------------{request}")
    return RequestInput(**request["input"])

def handler_impl(request_input: RequestInput, request: Dict[str, Any], env: Env):
    logger.info(f"handler_impl------------------{request_input}")
    prompt_obj = request_input.model_dump()  # 转换为字典
    prompt = create_prompt(prompt_obj)
    client_id = str(uuid.uuid4())
    server_host = os.getenv("COMFYUI_SERVER_HOST", "127.0.0.1")
    server_port = os.getenv("COMFYUI_SERVER_PORT", "8188")
    output_node = "77" # 工作流最终展示节点
    secure = False

    # 实例化ComfyUIClient
    client = ComfyUIClient(server_host=server_host, server_port=server_port, output_node=output_node, secure=secure)
        
    # 调用ComfyUIClient生成图片
    try:
        prompt_id = client.queue_prompt(prompt, client_id)
        
        
        # 获取生成的图像
        video = client.get_video(client_id=client_id, prompt_id=prompt_id)
        video_base64 = process_video(video)
        # 返回生成结果
        response = {
            "status": "success",
            "prompt_id": prompt_id,
            "video": video_base64[0]
        }

    except Exception as e:
        response = {
            "status": "error",
            "message": str(e)
        }
    client.close()
    return response

def handler(request: Dict[str, Any], env: Env):
    request_input = get_request_input(request)
    logger.info(f"handler------------------: {request_input}")
    return handler_impl(request_input, request, env)

def concurrency_modifier(current_concurrency: int) -> int:
    """
    Allow 5 job to run concurrently.
    Be careful with this function.
    You should fully understand python GIL and related problems before setting this value bigger than 1.
    """
    return 1

# Start the serverless function
logger.info("start to run handler.")
start({"handler": handler, "concurrency_modifier": concurrency_modifier})
