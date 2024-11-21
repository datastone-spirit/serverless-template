ARG BASE_URL

FROM ${BASE_URL}/library/cuda-12.1.1-cudnn-devel-ubuntu22.04:builder-torch231 AS cosyvoice

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV DEBIAN_FRONTEND noninteractive SHELL=/bin/bash

RUN apt-get update -y && apt-get upgrade -y && apt-get install -y --no-install-recommends openssh-server git-lfs && rm -rf /var/lib/apt/lists/*

WORKDIR /spirit
RUN git clone --recursive https://github.com/FunAudioLLM/CosyVoice.git
RUN cd /spirit/CosyVoice && git submodule update --init --recursive

RUN python -m venv --system-site-packages /spirit/CosyVoice/venv


# torch install by sd-script isn't compitable with our base image, must remove it
# https://github.com/FunAudioLLM/CosyVoice/issues/516#issuecomment-2423324107
RUN source /spirit/CosyVoice/venv/bin/activate && \
    cd /spirit/CosyVoice && \
    pip install -r requirements.txt && \
    pip install httpx[socks] \
    pip-system-certs  && \
    pip install gradio==5.4.0 && \
    pip install huggingface_hub==0.24.7 && \
    rm -rf /root/.cache/pip 

WORKDIR /spirit/CosyVoice/pretrained_models/

RUN git clone https://www.modelscope.cn/iic/CosyVoice-300M.git && \
    rm -rf /spirit/CosyVoice/pretrained_models/CosyVoice-300M/.git
RUN git clone https://www.modelscope.cn/iic/CosyVoice-300M-25Hz.git && \
    rm -rf /spirit/CosyVoice/pretrained_models/CosyVoice-300M-25Hz/.git
RUN git clone https://www.modelscope.cn/iic/CosyVoice-300M-SFT.git && \
    rm -rf /spirit/CosyVoice/pretrained_models/CosyVoice-300M-SFT/.git
RUN git clone https://www.modelscope.cn/iic/CosyVoice-300M-Instruct.git && \
    rm -rf /spirit/CosyVoice/pretrained_models/CosyVoice-300M-Instruct/.git
RUN git clone https://www.modelscope.cn/iic/CosyVoice-ttsfrd.git && \
    rm -rf /spirit/CosyVoice/pretrained_models/CosyVoice-ttsfrd/.git

RUN source /spirit/CosyVoice/venv/bin/activate && \
    cd /spirit/CosyVoice && \
    pip install modelscope==1.14.0

WORKDIR /spirit/CosyVoice

COPY requirements.txt /requirements.txt

RUN /spirit/CosyVoice/venv/bin/python -m pip install -r /requirements.txt

COPY src/ /spirit/CosyVoice_serverless

COPY start.sh /start.sh

RUN chmod 755 /start.sh

CMD ["/start.sh"]