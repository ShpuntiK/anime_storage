from base import *


def init_env():
    lines = [line.strip() for line in open('/etc/environment')]

    for line in lines:
        tmp = line.split('=')

        if len(tmp) == 2:
            key = tmp[0]
            value = tmp[1]

            ENV_VARS[key] = value

ENV_VARS = {}

init_env()

DEBUG = False

TEMPLATE_DEBUG = False

SECRET_KEY = ENV_VARS['ANIME_STORAGE_SECRET_KEY']

ALLOWED_HOSTS = ['.anime-storage.aivantsov.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': ENV_VARS['ANIME_STORAGE_DB_NAME'],
        'USER': ENV_VARS['ANIME_STORAGE_DB_USERNAME'],
        'PASSWORD': ENV_VARS['ANIME_STORAGE_DB_PASSWORD'],
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}