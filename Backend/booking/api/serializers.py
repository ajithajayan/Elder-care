from rest_framework import serializers
from booking.models import DoctorAvailability
from datetime import datetime
from django.core.exceptions import ValidationError





class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAvailability
        fields = '__all__'




class DoctorSlotUpdateSerializer(serializers.Serializer):
    date = serializers.DateField()
    slots = serializers.ListField(child=serializers.DictField())

    def validate(self, data):
        date = data.get('date')
        slots = data.get('slots')

        for slot_data in slots:
            from_time = datetime.strptime(slot_data.get('from_time'), '%H:%M:%S')
            to_time = datetime.strptime(slot_data.get('to_time'), '%H:%M:%S')

            # Check if the slot already exists for the specified date and time range
            if DoctorAvailability.objects.filter(doctor=self.context.get('doctor'), day=date, start_time=from_time, end_time=to_time).exists():
                raise ValidationError("Duplicate slot found. Please choose a different time range.", code='duplicate_slot')

        return data

    def update_doctor_slots(self, doctor):
        try:
            date = self.validated_data.get('date')
            for slot_data in self.validated_data.get('slots'):
                from_time = datetime.strptime(slot_data.get('from_time'), '%H:%M:%S')
                to_time = datetime.strptime(slot_data.get('to_time'), '%H:%M:%S')

                DoctorAvailability.objects.create(
                    doctor=doctor,
                    day=date,
                    start_time=from_time,
                    end_time=to_time
                )

            return True

        except Exception as e:
            raise serializers.ValidationError(f"Error updating doctor slots: {str(e)}")
        


# class DoctorSlotUpdateSerializer(serializers.Serializer):
#     date = serializers.DateField()
#     from_time = serializers.CharField()  # Assume it's a string in "HH:mm:ss" format
#     to_time = serializers.CharField()

#     def update_doctor_slots(self, doctor):
#         try:
#             date = self.validated_data['date']
#             from_time_str = self.validated_data['from_time']
#             to_time_str = self.validated_data['to_time']

#             # Parse the string time to datetime for saving
#             from_time = datetime.strptime(from_time_str, '%H:%M:%S').time()
#             to_time = datetime.strptime(to_time_str, '%H:%M:%S').time()

#             new_slot = {
#                 "from": from_time.strftime('%H:%M:%S'),
#                 "to": to_time.strftime('%H:%M:%S')
#             }

#             # Assuming `available_slots` is a related manager in the Doctor model
#             # If not, modify this part accordingly
#             doctor.available_slots.create(day=date, **new_slot)
#         except Exception as e:
#             raise serializers.ValidationError(f"Error updating doctor slots: {str(e)}")