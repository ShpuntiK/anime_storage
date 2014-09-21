from apps.api import models
from apps.api import serializers
from rest_framework import generics


class AnimeListCreate(generics.ListCreateAPIView):
    queryset = models.Anime.objects.all()
    serializer_class = serializers.AnimeSerializer


class AnimeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Anime.objects.all()
    serializer_class = serializers.AnimeSerializer


class TagListCreate(generics.ListCreateAPIView):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer


class TagRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer


class LinkListCreate(generics.ListCreateAPIView):
    queryset = models.Link.objects.all()
    serializer_class = serializers.LinkSerializer


class LinkRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Link.objects.all()
    serializer_class = serializers.LinkSerializer