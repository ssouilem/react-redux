import signal
import time
from functools import wraps


def timing(func):
    def wrap(*args, **kwargs):
        start_time = time.time()
        try:
            return func(*args, **kwargs)
        finally:
            print '<< {} function took {:0.3f} ms'.format(func.func_name, (time.time() - start_time) * 1000.0)

    return wrap


def timeout(seconds=10):
    def decorator(func):
        def _handle_timeout(signum, frame):
            raise Exception('{} took more than {} seconds'.format(func.func_name, seconds))

        def wrap(*args):
            signal.signal(signal.SIGALRM, _handle_timeout)
            signal.alarm(seconds)
            try:
                return func(*args)
            finally:
                signal.alarm(0)

        return wraps(func)(wrap)

    return decorator
