# generated by datamodel-codegen:
#   filename:  payload.json
#   timestamp: 2024-11-26T03:16:15+00:00

from __future__ import annotations

from pydantic import BaseModel


class RequestInput(BaseModel):
    positive: str
    negative: str
    videoWidth: str
    videoHeight: str
    steps: str
    seed: str
    cfg: str