from django.urls import path
from .views import DoctorSlotUpdateView,DoctorSlotsAPIView,DoctorSlotDeleteView,DocDetailList,DoctorsUserSideList,RazorpayOrderAPIView,check_availability,TransactionAPIView    

urlpatterns = [
    path('doctors/<str:custom_id>/slots/', DoctorSlotsAPIView.as_view(), name='doctor-slots-api'),
    
    path('doctors/<str:custom_id>/update_slots/', DoctorSlotUpdateView.as_view(), name='update-doctor-slots'),

    path('doctors/<str:custom_id>/delete_slot/', DoctorSlotDeleteView.as_view(), name='delete-slot'),

    #  to get the single user details based on the custom id
    path("detail/doctors/<str:pk>", DocDetailList().as_view(), name="Doc-list"),



    path("doctors/listing/", DoctorsUserSideList.as_view(), name="doctors-listing"),

    # for booking the slots of the doctor

    path('check-availability/', check_availability, name='check-availability'),

    path('create-order/', RazorpayOrderAPIView.as_view(), name='create_order'),

    path('complete-order/', TransactionAPIView.as_view(), name='complete_order'),




]