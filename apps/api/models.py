from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __unicode__(self):
        return self.name


class Anime(models.Model):
    RATING_CHOICES = zip(xrange(1, 6), range(1, 6))

    name = models.CharField(max_length=255)
    comment = models.TextField(blank=True)
    rating = models.SmallIntegerField(choices=RATING_CHOICES)
    year = models.IntegerField(null=True)
    tags = models.ManyToManyField(Tag)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.name


class Link(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField()
    anime = models.ForeignKey(Anime, related_name='links')

    def __unicode__(self):
        return self.name