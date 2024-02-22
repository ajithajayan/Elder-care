# views.py
import datetime
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from booking.models import DoctorAvailability
from .serializers import DoctorAvailabilitySerializer, DoctorSlotUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.models import Doctor
from django.utils import timezone
from django.utils.timezone import now

# from dateutil.parser import parse



class DoctorSlotUpdateView(APIView):
    def post(self, request, custom_id):
        try:
            doctor = Doctor.objects.get(custom_id=custom_id)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = DoctorSlotUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.update_doctor_slots(doctor)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class DoctorSlotsAPIView(APIView):
    def get(self, request, custom_id):
        try:
            doctor = Doctor.objects.get(custom_id=custom_id)
        except Doctor.DoesNotExist:
            return Response({'error': 'Doctor not found'}, status=status.HTTP_404_NOT_FOUND)

        # Specify the date for which you want to retrieve slots
        date_param = request.query_params.get('date')
        
        if not date_param:
            return Response({'error': 'Date parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            date = datetime.datetime.strptime(date_param, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Invalid date format'}, status=status.HTTP_400_BAD_REQUEST)

        # Use prefetch_related to optimize the query and fetch availability in a single query
        doctor_with_availability = Doctor.objects.prefetch_related('doctoravailability_set').get(custom_id=custom_id)

        # Retrieve and serialize the available slots for the specified date
        slots = {
            'available_slots': [
                {'from': slot.start_time, 'to': slot.end_time} for slot in doctor_with_availability.doctoravailability_set.filter(day=date)
            ]
        }

        return Response(slots, status=status.HTTP_200_OK)
    


# class DoctorSlotUpdateView(APIView):
#     def post(self, request, custom_id):
#         try:
#             doctor = Doctor.objects.get(custom_id=custom_id)
#         except Doctor.DoesNotExist:
#             return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

#         serializer = DoctorSlotUpdateSerializer(data=request.data)
#         if serializer.is_valid():
#             date = serializer.validated_data['date']
#             from_time = serializer.validated_data['from_time']
#             to_time = serializer.validated_data['to_time']

#             # Check if there are existing slots for the selected date
#             existing_slots = doctor.available_slots.filter(day=date)
            
#             if not existing_slots.exists():
#                 # If no existing slots, create default slots for the entire day
#                 start_of_day = datetime.combine(date, time.min)
#                 end_of_day = datetime.combine(date, time.max)
#                 default_slot = {
#                     "from": start_of_day.strftime('%H:%M:%S'),
#                     "to": end_of_day.strftime('%H:%M:%S')
#                 }
#                 doctor.available_slots.create(day=date, **default_slot)

#             # Update the doctor's slots as before
#             serializer.update_doctor_slots(doctor)
#             updated_doctor_serializer = DoctorAvailabilitySerializer(doctor)
#             return Response(updated_doctor_serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response({"error": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)
