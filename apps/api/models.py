from django.db import models


class Tag(models.Model):
    name = models.SlugField(max_length=255, unique=True)

    def __unicode__(self):
        return self.name


class Anime(models.Model):
    RATING_CHOICES = zip(xrange(1, 6), range(1, 6))

    name = models.CharField(max_length=255)
    comment = models.TextField(blank=True)
    rating = models.SmallIntegerField(choices=RATING_CHOICES)
    tags = models.ManyToManyField(Tag)

    def __unicode__(self):
        return self.name


class Link(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()
    anime = models.ForeignKey(Anime, related_name='links')

    def __unicode__(self):
        return self.url