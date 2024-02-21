from django.db import models

from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

from account.models import Doctor, User




class DoctorAvailability(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    day = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    # def save(self, *args, **kwargs):
    #     # Check if start_time is set
    #     if self.start_time:
    #         # Convert start_time to datetime object for calculation
    #         start_datetime = timezone.datetime.combine(timezone.datetime.today(), self.start_time)

    #         # Calculate end_time as 20 minutes after start_time
    #         end_datetime = start_datetime + timezone.timedelta(minutes=20)
    #         self.end_time = end_datetime.time()

    #     super().save(*args, **kwargs)