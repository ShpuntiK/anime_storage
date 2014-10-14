from rest_framework import serializers
from apps.api import models


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Link


class AnimeWithTagSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = models.Anime


class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Anime