from account.models import Doctor, User
from rest_framework import serializers
from booking.models import DoctorAvailability, Transaction
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
        


class DOCUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'id' ,'is_staff','is_superuser','user_type')



class AdminDocUpdateSerializer(serializers.ModelSerializer):
    user=DOCUserSerializer()
    class Meta:
        model = Doctor
        fields='__all__' 
        
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {}) # this is used to pop out the user object and if it is not existing then we will assign a {} to it as default
        user_serializer = DOCUserSerializer(instance.user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        return super().update(instance, validated_data)
    




# serializer used list out all the docotrs based on the filter


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'



class UserDetailsUpdateSerializer(serializers.ModelSerializer):
    doctor_user=DoctorSerializer(read_only=True)
    class Meta:
        model = User
        exclude = ('password','is_id_verified','is_email_verified','is_staff','is_superuser','user_type')   




# Docotr bookin serializer
        
class RazorpayOrderSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    currency = serializers.CharField()


class TranscationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = [ 'payment_id', 'order_id', 'signature', 'amount', 'doctor_id', 'patient_id', 'booked_date', 'booked_from_time', 'booked_to_time']


class TranscationModelList(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
