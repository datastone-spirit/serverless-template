ARG BASE_URL

FROM ${BASE_URL}/megaease/cuda-12.1.1-cudnn-devel-ubuntu22.04:builder-torch231 AS ollama

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV DEBIAN_FRONTEND noninteractive SHELL=/bin/bash

RUN apt-get update -y && apt-get upgrade -y && apt-get install -y --no-install-recommends openssh-server git-lfs && rm -rf /var/lib/apt/lists/*

WORKDIR /spirit

RUN python -m venv --system-site-packages /spirit/ollama/venv

# 安装 Ollama CLI
RUN curl -fsSL https://ollama.com/install.sh | sh

RUN ollama serve & sleep 30 && curl --retry 10 --retry-connrefused --retry-delay 1  -v http://localhost:11434/ && \
    curl -X POST -d '{"name": "llama3.2-vision"}' http://localhost:11434/api/pull

WORKDIR /spirit/ollama

COPY requirements.txt /requirements.txt

RUN /spirit/ollama/venv/bin/python -m pip install -r /requirements.txt && rm -rf ~/.cache/pip

COPY src/ /spirit/ollama_serverless

COPY start.sh /start.sh

RUN chmod 755 /start.sh

CMD ["/start.sh"]