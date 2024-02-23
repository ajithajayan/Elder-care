from django.urls import path
from .views import DoctorSlotUpdateView,DoctorSlotsAPIView,DoctorSlotDeleteView,DocDetailList

urlpatterns = [
    path('doctors/<str:custom_id>/slots/', DoctorSlotsAPIView.as_view(), name='doctor-slots-api'),
    
    path('doctors/<str:custom_id>/update_slots/', DoctorSlotUpdateView.as_view(), name='update-doctor-slots'),

    path('doctors/<str:custom_id>/delete_slot/', DoctorSlotDeleteView.as_view(), name='delete-slot'),

    path("detail/doctors/<str:pk>", DocDetailList().as_view(), name="Doc-list"),

]