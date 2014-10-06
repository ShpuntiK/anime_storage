# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20140927_0527'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='comment',
            field=models.TextField(blank=True),
        ),
    ]
