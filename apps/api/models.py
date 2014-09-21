from django.db import models


class Anime(models.Model):
    RATING_CHOICES = zip(xrange(1, 6), range(1, 6))

    name = models.CharField(max_length=255)
    comment = models.TextField()
    ratings = models.SmallIntegerField(choices=RATING_CHOICES)

    def __unicode__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=255)
    anime = models.ManyToManyField(Anime)

    def __unicode__(self):
        return self.name


class Link(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    url = models.URLField()
    anime = models.ForeignKey(Anime, related_name='links')

    def __unicode__(self):
        return self.url