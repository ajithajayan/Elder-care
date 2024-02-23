# views.py
import datetime
from xml.dom import ValidationErr
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from booking.models import DoctorAvailability
from .serializers import AdminDocUpdateSerializer, DoctorAvailabilitySerializer, DoctorSlotUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from account.models import Doctor
from django.utils import timezone
from django.utils.timezone import now
from rest_framework import status, generics
from rest_framework.parsers import MultiPartParser, FormParser

# from dateutil.parser import parse



class DoctorSlotUpdateView(APIView):
    def post(self, request, custom_id):
        try:
            doctor = Doctor.objects.get(custom_id=custom_id)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = DoctorSlotUpdateSerializer(data=request.data, context={'doctor': doctor})
        try:
            serializer.is_valid(raise_exception=True)
            serializer.update_doctor_slots(doctor)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ValidationErr as e:
            if 'duplicate_slot' in e.get_codes():
                return Response({"error": str(e)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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
    


class DoctorSlotDeleteView(APIView):
    def delete(self, request, custom_id):
        try:
            doctor = Doctor.objects.get(custom_id=custom_id)
        except Doctor.DoesNotExist:
            return Response({"error": "Doctor not found"}, status=status.HTTP_404_NOT_FOUND)

        date = request.data.get('date')
        slot = request.data.get('slot')

        try:
            # Assuming DoctorAvailability has a ForeignKey to Doctor named 'doctor'
            doctor_availability = DoctorAvailability.objects.get(doctor=doctor, day=date, start_time=slot['from'], end_time=slot['to'])
            doctor_availability.delete()
            return Response({"message": "Slot deleted successfully"}, status=status.HTTP_200_OK)
        except DoctorAvailability.DoesNotExist:
            return Response({"error": "Slot not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Error deleting slot: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


#****************************************** doctor detail page listing **************************************

class DocDetailList(generics.RetrieveAPIView):
    queryset = Doctor.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = AdminDocUpdateSerializer
    lookup_field = 'pk'
