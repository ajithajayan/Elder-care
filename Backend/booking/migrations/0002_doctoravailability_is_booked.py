# Generated by Django 5.0.1 on 2024-02-24 15:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('booking', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctoravailability',
            name='is_booked',
            field=models.BooleanField(default=False),
        ),
    ]
