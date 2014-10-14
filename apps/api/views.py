from apps.api import models
from apps.api import serializers
from rest_framework import generics, status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist, ValidationError


def get_tags_ids(tags):
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
        data['tags'] = get_tags_ids(data['tags'])

        serializer = self.get_serializer(data=data)

        if serializer.is_valid():
            self.pre_save(serializer.object)
            self.object = serializer.save(force_insert=True)
            self.post_save(self.object, created=True)
            headers = self.get_success_headers(serializer.data)

            return Response(serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnimeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Anime.objects.all()
    serializer_class = serializers.AnimeWithTagSerializer

    def update(self, request, *args, **kwargs):
        self.object = self.get_object_or_none()

        data = request.DATA
        data['tags'] = get_tags_ids(data['tags'])

        request_serializer = serializers.AnimeSerializer(self.object, data=data)

        if not request_serializer.is_valid():
            return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            self.pre_save(request_serializer.object)
        except ValidationError as err:
            return Response(err.message_dict, status=status.HTTP_400_BAD_REQUEST)

        self.object = request_serializer.save(force_update=True)
        self.post_save(self.object, created=False)

        response_serializer = serializers.AnimeWithTagSerializer(self.object)

        return Response(response_serializer.data, status=status.HTTP_200_OK)


class TagList(generics.ListAPIView):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer


class LinkListCreate(generics.ListCreateAPIView):
    queryset = models.Link.objects.all()
    serializer_class = serializers.LinkSerializer


class LinkRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Link.objects.all()
    serializer_class = serializers.LinkSerializer