# Generated by Django 4.2.4 on 2023-12-13 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_actiontable'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actiontable',
            name='timeAdd',
            field=models.DateTimeField(),
        ),
    ]
