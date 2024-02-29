
from django.db import models
from account.models import Doctor, Patient
from booking.models import Transaction



class Notification(models.Model):
    sender = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='sent_notifications')
    receiver = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='received_notifications')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, related_name='notifications', null=True)

    def __str__(self):
        return f'{self.sender} to {self.receiver}: {self.message}'