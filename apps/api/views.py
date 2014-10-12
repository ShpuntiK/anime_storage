from apps.api import models
from apps.api import serializers
from rest_framework import generics, status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist


def process_tags(tags):
    tag_ids = []

    for tag in tags:
        if 'id' in tag:
            tag_ids.append(tag['id'])
        else:
            try:
                existed_tag = models.Tag.objects.get(name=tag['name'])
                tag_ids.append(existed_tag.id)
            except ObjectDoesNotExist:
                new_tag = models.Tag(name=tag['name'])
                new_tag.save()
                tag_ids.append(new_tag.id)

    return tag_ids


class AnimeListCreate(generics.ListCreateAPIView):
    queryset = models.Anime.objects.all()
    serializer_class = serializers.AnimeSerializer

    def create(self, request, *args, **kwargs):
        data = request.DATA
        data['tags'] = process_tags(data['tags'])
        serializer = self.get_serializer(data=data)

        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnimeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Anime.objects.all()
    serializer_class = serializers.AnimeSerializer


class TagList(generics.ListAPIView):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer


class LinkListCreate(generics.ListCreateAPIView):
    queryset = models.Link.objects.all()
    serializer_class = serializers.LinkSerializer


class LinkRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Link.objects.all()
    serializer_class = serializers.LinkSerializer