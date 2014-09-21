from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from apps.api import views

urlpatterns = patterns('',
    url(r'^anime$', views.AnimeListCreate.as_view(), name='anime_getlist_create'),
    url(r'^anime/(?P<pk>[0-9]+)', views.AnimeRetrieveUpdateDestroy.as_view(), name='anime_get_update_delete'),
    url(r'^tag$', views.TagListCreate.as_view(), name='tag_getlist_create'),
    url(r'^tag/(?P<pk>[0-9]+)', views.TagRetrieveUpdate.as_view(), name='tag_get_update'),
    url(r'^link$', views.LinkListCreate.as_view(), name='link_getlist_create'),
    url(r'^link/(?P<pk>[0-9]+)', views.LinkRetrieveUpdateDestroy.as_view(), name='link_get_update_delete'),
)

urlpatterns = format_suffix_patterns(urlpatterns)