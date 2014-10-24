from apps.api import models
from apps.api import serializers
from rest_framework import generics, status
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist, ValidationError


def save_tag(name):
    new_tag = models.Tag(name=name)
    new_tag.save()
    return new_tag


def get_tags(tags):
    result = []

    for tag in tags:
        if 'id' in tag:
            result.append(tag['id'])
        else:
            try:
                existed_tag = models.Tag.objects.get(name=tag['name'])
                result.append(existed_tag.id)
            except ObjectDoesNotExist:
                new_tag = save_tag(tag['name'])
                result.append(new_tag.id)

    return result


def delete_links(anime):
    models.Link.objects.filter(anime=anime).delete()


def save_links(links, anime):
    delete_links(anime)

    for link in links:
        new_link = models.Link(name=link['name'], url=link['url'], anime=anime)
        new_link.save()


class AnimeListCreate(generics.ListCreateAPIView):
    queryset = models.Anime.objects.all()
    serializer_class = serializers.AnimeWithRelationshipsSerializer

    def create(self, request, *args, **kwargs):
        data = request.DATA
        data['tags'] = get_tags(data['tags'])

        request_serializer = serializers.AnimeSerializer(data=data)

        if request_serializer.is_valid():
            self.pre_save(request_serializer.object)
            self.object = request_serializer.save(force_insert=True)
            self.post_save(self.object, created=True)

            save_links(data['links'], self.object)

            headers = self.get_success_headers(request_serializer.data)

            response_serializer = serializers.AnimeWithRelationshipsSerializer(self.object)

            return Response(response_serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)

        return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnimeRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Anime.objects.all()
    serializer_class = serializers.AnimeWithRelationshipsSerializer

    def update(self, request, *args, **kwargs):
        self.object = self.get_object_or_none()

        data = request.DATA
        data['tags'] = get_tags(data['tags'])
        save_links(data['links'], self.object)

        request_serializer = serializers.AnimeSerializer(self.object, data=data)

        if not request_serializer.is_valid():
            return Response(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            self.pre_save(request_serializer.object)
        except ValidationError as err:
            return Response(err.message_dict, status=status.HTTP_400_BAD_REQUEST)

        self.object = request_serializer.save(force_update=True)
        self.post_save(self.object, created=False)

        response_serializer = serializers.AnimeWithRelationshipsSerializer(self.object)

        return Response(response_serializer.data, status=status.HTTP_200_OK)


class TagList(generics.ListAPIView):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer