
#signals.py


from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from notification.models import Notification    

from api.serializers import NotificationSerializer
import json


@receiver(post_save, sender=Notification)
def create_notification_for_Doctor(sender, instance, created, **kwargs):
    doctor = instance.Doctor
    if doctor and created:

        # Send notification using channels to doctor's channel
        channel_layer = get_channel_layer()
        doctor_channel = f"notify_{instance.Doctor.custom_id}"
        serialized_instance = NotificationSerializer(instance).data

        
  
        async_to_sync(channel_layer.group_send)(
            doctor_channel,
            {
                "type": "send_notification",
                "value": json.dumps(serialized_instance),
            }
        )







