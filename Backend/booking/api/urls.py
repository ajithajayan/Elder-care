from django.urls import path
from .views import DoctorSlotUpdateView,DoctorSlotsAPIView

urlpatterns = [
    path('doctors/<str:custom_id>/slots/', DoctorSlotsAPIView.as_view(), name='doctor-slots-api'),
    
    path('doctors/<str:custom_id>/update_slots/', DoctorSlotUpdateView.as_view(), name='update-doctor-slots'),

]