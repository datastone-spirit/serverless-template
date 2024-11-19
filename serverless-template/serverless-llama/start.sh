#!/bin/bash

echo "Container Started"
export PYTHONUNBUFFERED=1

# 激活虚拟环境
source /spirit/ollama/venv/bin/activate

# 设置 Python 路径以包含 ollama 和 serverless 代码库
export PYTHONPATH=/spirit/ollama:/spirit/ollama_serverless

# 启动 Ollama 服务
ollama serve &

# 等待服务启动（可以调整睡眠时间）
sleep 10

# 启动 ollama serverless 的入口脚本
exec /spirit/ollama/venv/bin/python -u /spirit/ollama_serverless/main.py
