from django.contrib import admin
from apps.api import models


admin.site.register(models.Anime)
admin.site.register(models.Tag)
admin.site.register(models.Link)