from django.db import models

from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

from account.models import Doctor, User




class DoctorAvailability(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    day = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

