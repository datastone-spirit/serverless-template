import time
import logging
import functools

def retry(max_retries, wait_time):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            retries = 0
            if retries < max_retries:
                try:
                    result = func(*args, **kwargs)
                    return result
                except Exception:
                    logging.exception(f"Call function error, retrying {retries} times, max retries {max_retries}")
                    retries += 1
                    time.sleep(wait_time)
            else:
              raise Exception(f"After retry max retries:{max_retries} of function {func}, it still failed")
        return wrapper
    return decorator