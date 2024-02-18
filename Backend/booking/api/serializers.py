from rest_framework import serializers
from booking.models import DoctorAvailability






class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAvailability
        fields = '__all__'