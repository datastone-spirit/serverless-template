prompt_text = r'''
{
  "6": {
    "inputs": {
      "text": "A woman with long brown hair and light skin smiles at another woman with long blonde hair. The woman with brown hair wears a black jacket and has a small, barely noticeable mole on her right cheek. The camera angle is a close-up, focused on the woman with brown hair's face. The lighting is warm and natural, likely from the setting sun, casting a soft glow on the scene. The scene appears to be real-life footage.",
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
      "clip_name": "t5xxl_fp16.safetensors",
      "type": "ltxv"
    },
    "class_type": "CLIPLoader"
  },
  "41": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "fps": 24,
      "lossless": false,
      "quality": 90,
      "method": "default",
      "images": [
        "8",
        0
      ]
    },
    "class_type": "SaveAnimatedWEBP"
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
      "base_shift": 0.95,
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
      "noise_seed": 1042047503385047,
      "cfg": 3,
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
  }
}
'''