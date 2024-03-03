
from django.db import models
from account.models import Doctor, Patient
from booking.models import Transaction



class Notification(models.Model):
   NOTIFICATION_TYPES = [
        ('booked', 'New Booked'),
        ('pending', 'New Pending'),
        ('completed', 'New Completed'),
        ('cancelled', 'New Cancelled'),
        
    ]
   
   RECEIVER_TYPE = [
       ('patient','PATIENT'),
       ('doctor', 'DOCTOR'),
   ]
   
   
   
   Patient = models.ForeignKey(Patient, related_name="notification_to", on_delete=models.CASCADE, null=True)
   Doctor = models.ForeignKey(Doctor, related_name="notification_from", on_delete=models.CASCADE, null=True)
   receiver_type = models.CharField(choices=RECEIVER_TYPE, max_length=30, null=True)
   message = models.CharField(max_length=250, null=True)
   notification_type = models.CharField(choices=NOTIFICATION_TYPES, max_length=50)
   created = models.DateTimeField(auto_now_add=True)
   is_seen = models.BooleanField(default=False)
   
   def _str_(self):
        return f"{self.from_user} sent a {self.notification_type} notification to {self.to_user}"