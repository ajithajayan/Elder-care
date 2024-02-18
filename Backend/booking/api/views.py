# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from booking.models import DoctorAvailability
from .serializers import DoctorAvailabilitySerializer




class DoctorAvailabilityListCreateView(generics.ListCreateAPIView):
    queryset = DoctorAvailability.objects.all()
    serializer_class = DoctorAvailabilitySerializer
   

    def perform_create(self, serializer):
        # Automatically set the doctor field based on the authenticated user
        serializer.save(doctor=self.request.user)

class DoctorAvailabilityRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DoctorAvailability.objects.all()
    serializer_class = DoctorAvailabilitySerializer
 
