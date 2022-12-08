# Generated by Django 4.0.3 on 2022-12-07 20:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0006_rename_date_appointment_appt_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='appt_date',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='appt_time',
        ),
        migrations.AddField(
            model_name='appointment',
            name='apt_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='appointment',
            name='apt_time',
            field=models.TimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]