prompt_text = r'''
{
  "6": {
    "inputs": {
      "text": "In a serene courtyard setting, a monkey relaxes in a steaming hot spring, its eyes fixed on a smartphone. The monkey is the main focus of the scene. Surrounded by mist and the gentle sounds of nature, the monkey appears both content and engaged with the device. The warm water contrasts with the cool air, creating a cozy and peaceful atmosphere. The camera captures this unusual scene from a low angle, focused on the monkey, emphasizing the monkey's relaxed posture and the steam rising around it. The soft, diffused lighting enhances the tranquil mood, making the moment feel both whimsical and serene",
      "clip": [
        "38",
        0
      ]
    },
    "class_type": "CLIPTextEncode"
  },
  "7": {
    "inputs": {
      "text": "low quality, worst quality, deformed, distorted, disfigured, motion smear, motion artifacts, fused fingers, bad anatomy, weird hand, ugly",
      "clip": [
        "38",
        0
      ]
    },
    "class_type": "CLIPTextEncode"
  },
  "8": {
    "inputs": {
      "samples": [
        "72",
        0
      ],
      "vae": [
        "44",
        2
      ]
    },
    "class_type": "VAEDecode"
  },
  "38": {
    "inputs": {
      "clip_name": "t5xxl_fp8_e4m3fn_scaled.safetensors",
      "type": "ltxv"
    },
    "class_type": "CLIPLoader"
  },
  "44": {
    "inputs": {
      "ckpt_name": "ltx-video-2b-v0.9.safetensors"
    },
    "class_type": "CheckpointLoaderSimple"
  },
  "69": {
    "inputs": {
      "frame_rate": 25,
      "positive": [
        "6",
        0
      ],
      "negative": [
        "7",
        0
      ]
    },
    "class_type": "LTXVConditioning"
  },
  "70": {
    "inputs": {
      "width": 768,
      "height": 512,
      "length": 97,
      "batch_size": 1
    },
    "class_type": "EmptyLTXVLatentVideo"
  },
  "71": {
    "inputs": {
      "steps": 30,
      "max_shift": 2.05,
      "base_shift": 0.9500000000000001,
      "stretch": true,
      "terminal": 0.1,
      "latent": [
        "70",
        0
      ]
    },
    "class_type": "LTXVScheduler"
  },
  "72": {
    "inputs": {
      "add_noise": true,
      "noise_seed": 469508935569123,
      "cfg": 7.5,
      "model": [
        "44",
        0
      ],
      "positive": [
        "69",
        0
      ],
      "negative": [
        "69",
        1
      ],
      "sampler": [
        "73",
        0
      ],
      "sigmas": [
        "71",
        0
      ],
      "latent_image": [
        "70",
        0
      ]
    },
    "class_type": "SamplerCustom"
  },
  "73": {
    "inputs": {
      "sampler_name": "euler"
    },
    "class_type": "KSamplerSelect"
  },
  "77": {
    "inputs": {
      "frame_rate": 25,
      "loop_count": 0,
      "filename_prefix": "ltx",
      "format": "video/h264-mp4",
      "pix_fmt": "yuv420p",
      "crf": 19,
      "save_metadata": true,
      "pingpong": false,
      "save_output": true,
      "images": [
        "8",
        0
      ],
      "vae": [
        "44",
        2
      ]
    },
    "class_type": "VHS_VideoCombine"
  }
}
'''