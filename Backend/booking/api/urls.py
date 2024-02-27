from django.urls import path
from .views import  DoctorBookingDetailsAPIView, DoctorSlotUpdateView,DoctorSlotsAPIView,DoctorSlotDeleteView,DocDetailList,DoctorsUserSideList, PatientBookingDetailsAPIView, PatientDetailList,RazorpayOrderAPIView, TrasactionListAPIView, TrasactionRetriveAPIView, cancel_booking, cancel_booking_doctor,check_availability,TransactionAPIView    

urlpatterns = [
    path('doctors/<str:custom_id>/slots/', DoctorSlotsAPIView.as_view(), name='doctor-slots-api'),
    
    path('doctors/<str:custom_id>/update_slots/', DoctorSlotUpdateView.as_view(), name='update-doctor-slots'),

    path('doctors/<str:custom_id>/delete_slot/', DoctorSlotDeleteView.as_view(), name='delete-slot'),

    #  to get the single Doctor details based on the custom id
    path("detail/doctors/<str:pk>", DocDetailList().as_view(), name="Doc-list"),

    #  to get the single Patient details based on the custom id
    path("detail/patient/<str:pk>", PatientDetailList().as_view(), name="Doc-list"),



    path("doctors/listing/", DoctorsUserSideList.as_view(), name="doctors-listing"),

    # for booking the slots of the doctor

    path('check-availability/', check_availability, name='check-availability'),

    path('create-order/', RazorpayOrderAPIView.as_view(), name='create_order'),

    path('complete-order/', TransactionAPIView.as_view(), name='complete_order'),

    path('detail/transaction/list/', TrasactionListAPIView.as_view(), name='doctor-slots-api'),

    path('detail/transaction/<str:pk>', TrasactionRetriveAPIView.as_view(), name='doctor-slots-api'),

    # for cancel the booking from the patient side

    path('cancel/booking/', cancel_booking, name='cancel-booking'),
    
    # for cancel the booking from the Docotr side

    path('cancel/booking/doctor/', cancel_booking_doctor, name='cancel-booking'),



    # for getting the booking details for the perticular patient for Patient side listing

    path('booking/details/patient/<str:patient_id>', PatientBookingDetailsAPIView, name='booking-details'),

    # for getting the booking details for the perticular Docotor for docotr side listing

    path('booking/details/doctor/<str:doctor_id>', DoctorBookingDetailsAPIView, name='booking-details'),


]