from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from apps.api import views

urlpatterns = patterns('',
    url(r'^anime$', views.AnimeListCreate.as_view(), name='anime-getlist-create'),
    url(r'^anime/(?P<pk>[0-9]+)', views.AnimeRetrieveUpdateDestroy.as_view(), name='anime-get-update-delete'),
    url(r'^tag$', views.TagList.as_view(), name='tag-getlist'),
)

urlpatterns = format_suffix_patterns(urlpatterns)