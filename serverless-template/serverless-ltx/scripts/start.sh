#!/bin/bash

echo "Container Started"
export PYTHONUNBUFFERED=1

source /workspace/ComfyUI/venv/bin/activate

mkdir -p /root/output

cd /workspace/ComfyUI && git pull

# 让生成的图像保留在我们的存储中
rm -rf /workspace/ComfyUI/output && ln -sf /root/output /workspace/ComfyUI/output

/workspace/ComfyUI/venv/bin/python /workspace/ComfyUI/main.py --listen=0.0.0.0 &

export PYTHOHPATH=/workspace/ltx_serverless 

exec /workspace/ComfyUI/venv/bin/python -u /workspace/ltx_serverless/main.py
