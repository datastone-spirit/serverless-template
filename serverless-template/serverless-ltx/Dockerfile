ARG BASE_URL

FROM ${BASE_URL}/library/cuda-12.1.1-cudnn-devel-ubuntu22.04:py310-builder-torch241 AS builder

WORKDIR /workspace
RUN git clone https://github.com/comfyanonymous/ComfyUI.git
WORKDIR /workspace/ComfyUI
RUN python -m venv --system-site-packages /workspace/ComfyUI/venv
ENV PATH="/workspace/ComfyUI/venv/bin:$PATH"
ENV PATH="/root/.local/bin:$PATH"

RUN pip install opencv-python pandas ultralytics py-cpuinfo seaborn thop pytz tzdata matplotlib numexpr httpx[socks] pip-system-certs 
RUN pip install -r requirements.txt
RUN pip install esdk-obs-python --trusted-host pypi.org

WORKDIR /workspace/ComfyUI/custom_nodes
RUN git clone https://github.com/ltdrdata/ComfyUI-Manager.git
RUN git clone https://github.com/AlekPet/ComfyUI_Custom_Nodes_AlekPet.git
RUN git clone https://github.com/twri/sdxl_prompt_styler.git
RUN git clone https://github.com/pythongosssss/ComfyUI-Custom-Scripts.git
RUN git clone https://github.com/cubiq/ComfyUI_IPAdapter_plus.git
RUN git clone https://github.com/ltdrdata/ComfyUI-Impact-Pack.git
RUN git clone https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet.git

WORKDIR /workspace/ComfyUI/custom_nodes/ComfyUI-Manager
RUN pip install -r requirements.txt

WORKDIR /workspace/ComfyUI/custom_nodes/ComfyUI-Impact-Pack
RUN pip install -r requirements.txt && \
    cd /workspace/ComfyUI/custom_nodes/ComfyUI-Impact-Pack && \
    /workspace/ComfyUI/venv/bin/python install.py && \
    cd /workspace/ComfyUI/custom_nodes/ComfyUI-Impact-Pack/impact_subpack && \
    /workspace/ComfyUI/venv/bin/python install.py 


RUN pip install -U spandrel kornia  && pip install argostranslate==1.9.6 ctranslate2==4.3.1 joblib==1.4.2 protobuf==5.27.3 sacremoses==0.0.53 stanza==1.1.1

# Use bash, make nicer
ENV SHELL /bin/bash
# COPY jupyter/bashrc /workspace/.bashrc
WORKDIR /workspace/ComfyUI

FROM ${BASE_URL}/library/cuda-12.1.1-cudnn-devel-ubuntu22.04:py310-builder-torch241 as ltx

COPY --from=builder /workspace/ComfyUI /workspace/ComfyUI

RUN curl -L 'https://huggingface.co/Lightricks/LTX-Video/resolve/main/ltx-video-2b-v0.9.safetensors?download=true' -o /workspace/ComfyUI/models/checkpoints/ltx-video-2b-v0.9.safetensors

RUN curl -L 'https://huggingface.co/Comfy-Org/stable-diffusion-3.5-fp8/resolve/main/text_encoders/t5xxl_fp8_e4m3fn_scaled.safetensors?download=true' -o /workspace/ComfyUI/models/clip/t5xxl_fp8_e4m3fn_scaled.safetensors

RUN apt-get update -y && apt-get upgrade -y && apt-get install -y --no-install-recommends openssh-server && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace/ComfyUI/custom_nodes
RUN git clone https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

SHELL [ "/bin/bash", "-c" ]
ENV SHELL=/bin/bash

RUN source /workspace/ComfyUI/venv/bin/activate && \
    cd /workspace/ComfyUI/custom_nodes/ComfyUI-Manager && \
    pip install -r requirements.txt && \
    cd /workspace/ComfyUI/custom_nodes/ComfyUI-VideoHelperSuite && \
    pip install -r requirements.txt && \
    cd /workspace/ComfyUI/custom_nodes/ComfyUI-Impact-Pack && \
    /workspace/ComfyUI/venv/bin/python install.py && \
    cd /workspace/ComfyUI/custom_nodes/ComfyUI-Impact-Pack/impact_subpack && \
    /workspace/ComfyUI/venv/bin/python install.py && \
    rm -rf ~/.cache/pip


WORKDIR /workspace/ComfyUI

COPY requirements.txt /requirements.txt

RUN /workspace/ComfyUI/venv/bin/python -m pip install -r /requirements.txt && rm -rf ~/.cache/pip

COPY src/ /workspace/ltx_serverless

COPY scripts/start.sh /start.sh

RUN chmod 755 /start.sh

CMD ["/start.sh"]
