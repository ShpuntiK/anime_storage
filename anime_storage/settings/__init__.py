from base import *

try:
    from development import *
except ImportError, exception:
    raise exception