from django.contrib import admin
from apps.api import models


class AnimeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

admin.site.register(models.Anime, AnimeAdmin)
admin.site.register(models.Tag)
admin.site.register(models.Link)