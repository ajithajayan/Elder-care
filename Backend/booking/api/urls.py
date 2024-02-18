from django.urls import path
from .views import DoctorAvailabilityListCreateView, DoctorAvailabilityRetrieveUpdateDestroyView

urlpatterns = [
    path('availability/', DoctorAvailabilityListCreateView.as_view(), name='doctor-availability-list-create'),
    path('availability/<int:pk>/', DoctorAvailabilityRetrieveUpdateDestroyView.as_view(), name='doctor-availability-retrieve-update-destroy'),
]