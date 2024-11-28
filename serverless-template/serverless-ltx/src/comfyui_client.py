import logging
import websocket
import requests
import json
import urllib.request
import urllib.parse
from requests.adapters import HTTPAdapter

# YOU MUST IGNORE THE rETRY MODULE IMPORT ERROR
from requests.packages.urllib3.util.retry import Retry

class ComfyUIClient:
    def __init__(self, server_host: str, server_port: str, output_node: str, secure :bool = False) -> None:
        self.ready = False 
        # self.server_address = server_addr
        self.server_host = server_host
        self.server_port = server_port
        self.secure = secure
        self.output_node = output_node
        self.ws = websocket.WebSocket()  
        logging.info(f"ComfyUIClient created with server address {self.server_host}:{self.server_port}")

    
    def _get_base_url(self):
        scheme = "https" if self.secure is True else "http"
        return f"{scheme}://{self.server_host}:{self.server_port}"
    
    def queue_prompt(self, prompt, client_id : str) -> str:

        self.ws.connect(f'{"wss" if self.secure else "ws"}://{self.server_host}:{self.server_port}/ws?clientId={client_id}')
        self.check_ready()
        p = {"prompt": prompt, "client_id": client_id}
        data = json.dumps(p).encode('utf-8')
        req = urllib.request.Request(f'{self._get_base_url()}/prompt', data=data)
        return json.loads(urllib.request.urlopen(req).read())['prompt_id']
        
    
    def get_video(self, client_id: str, prompt_id :str):
        self.check_ready()
        output_data = {}
        current_node = ""
        try:
            while True:
                out = self.ws.recv()
                if isinstance(out, str):
                    message = json.loads(out)
                    if message['type'] == 'executed':
                        images_output = output_data.get(self.output_node, [])
                        images_output.append(out)
                        output_data[self.output_node] = images_output
                        return output_data[self.output_node]  # 直接返回结果
                    elif message['type'] == 'executing':
                        data = message['data']
                        if data['prompt_id'] == prompt_id:
                            if data['node'] is None:
                                break #Execution is done
                            else:
                                current_node = data['node']
        finally:
            self.ws.close()
            
        return output_data[self.output_node]

    def check_ready(self) -> bool:
        if self.ready is True:
            return True
        try:
            resp = requests_retry_session().get(f'{self._get_base_url()}/system_stats')
            if resp.status_code >= 300:
                return False
            else:
                self.ready = True
        except Exception as e:
            raise Exception(f"Failed to detect ComfyUI server status at {self._get_base_url()}")

        return self.ready
    
    def close(self):
        if self.ws is not None:
            self.ws.close()
    

def requests_retry_session(
    retries=10,
    backoff_factor=0.1,
    status_forcelist=(500, 502, 504),
    session=None,
):
    session = session or requests.Session()
    retry = Retry(
        total=retries,
        read=retries,
        connect=retries,
        backoff_factor=backoff_factor,
        status_forcelist=status_forcelist,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session

# deprecated
def detect_comfyui_status(server_address :str, secure :bool = False ) ->bool:
    resp = requests.get(f'{"https" if secure is True else "http"}://{server_address}/system_stats') 
    logging.info(f"Checking comfyui status: {resp.status_code} at {server_address}")
    if resp.status_code >= 300:
        raise Exception(f"Failed to get system stats from server {server_address}: {resp.text}")
    return True