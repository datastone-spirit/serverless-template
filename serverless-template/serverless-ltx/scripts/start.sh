#!/bin/bash

echo "Container Started"
export PYTHONUNBUFFERED=1

source /workspace/ComfyUI/venv/bin/activate

mkdir -p /root/output

cd /workspace/ComfyUI && git pull

# 让生成的图像保留在我们的存储中
rm -rf /workspace/ComfyUI/output && ln -sf /root/output /workspace/ComfyUI/output

# 创建目标目录（如果不存在）
mkdir -p "$TARGET_DIR"

# 列出源目录下的所有文件并创建软链接
for file in "$SOURCE_DIR"/*; do
    if [ -f "$file" ]; then
        ln -sf "$file" "$TARGET_DIR/"
        echo "Linked $file to $TARGET_DIR/"
    fi
done

/workspace/ComfyUI/venv/bin/python /workspace/ComfyUI/main.py --listen=0.0.0.0 &

export PYTHOHPATH=/workspace/ltx_serverless 

exec /workspace/ComfyUI/venv/bin/python -u /workspace/ltx_serverless/main.py
