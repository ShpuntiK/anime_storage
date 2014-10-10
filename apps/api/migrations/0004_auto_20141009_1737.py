# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20141002_1749'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='anime',
            field=models.ManyToManyField(to=b'api.Anime', blank=True),
        ),
    ]
