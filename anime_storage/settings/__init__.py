from base import *

if os.environ.get('DJANGO_ENV') == 'production':
    try:
        from production import *
    except ImportError, exception:
        raise exception
else:
    try:
        from development import *
    except ImportError, exception:
        raise exception