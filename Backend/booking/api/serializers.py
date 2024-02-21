from rest_framework import serializers
from booking.models import DoctorAvailability






class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAvailability
        fields = '__all__'


class DoctorSlotUpdateSerializer(serializers.Serializer):
    date = serializers.DateField()
    from_time = serializers.DateTimeField()
    to_time = serializers.DateTimeField()

    def update_doctor_slots(self, doctor):
        # Perform logic to update doctor's available_slots using the provided date, from_time, and to_time
        new_slot = {"from": self.validated_data['from_time'], "to": self.validated_data['to_time']}
        doctor.available_slots.append(new_slot)
        doctor.save()