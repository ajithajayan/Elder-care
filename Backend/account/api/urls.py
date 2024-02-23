from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    #  ********************************Token*****************************

    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    # ***********************Register and login****************************
    path("register", views.RegisterView.as_view(), name="user-register"),
    path("login", views.UserLogin.as_view(), name="user-login"),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('verify-otp', views.OTPVerificationView.as_view(), name='verify-otp'),
    path('resend-otp/', views.ResendOTPView.as_view(), name='resend-otp'),



    path("user/details/", views.UserDetails.as_view(), name="user-details"),

    # **************************Main portion to list all the doctors considering base on the main user table ****************
    path("doctors/details/", views.UserDetailsUpdate.as_view(), name="doctors-details"),
    path("user/update/<str:pk>", views.UserDetailsUpdate.as_view(), name="user-update"),
    path("user/list/<str:pk>", views.UserDetailsUpdate().as_view(), name="user-list"),

    
    path("patient/details/", views.PatientUseDetailsUpdate.as_view(), name="patient-details"),


    # ***************this portion used for get the user details by main user id*************************
    path("doc/list/<str:pk>", views.DocDetailsUpdate().as_view(), name="doc-list"),
    path("doc/update/<str:pk>", views.DocDetailsUpdate().as_view(), name="doc-update"),
    # *******************************************************************************************
    path("patient/list/<str:pk>", views.ClientDetailsUpdate().as_view(), name="patient-list"),

    #  this portion is used for the doc and patient updation base on their custom_id

    path("admin/doc/<str:pk>", views.AdminDocUpdate().as_view(), name="adminDoc-update"),
    path("admin/doc/delete/<str:pk>", views.AdminDocDelete().as_view(), name="adminDoc-delete"),
    path("admin/client/<str:pk>", views.AdminClientUpdate().as_view(), name="adminClient-Update"),


    # for verification file for docotrs

    path('verification/doctor/<str:user__id>/', views.VarificationDoctorView.as_view(), name='verification-doctor'),


   # for verification file for admins 

    path('admin/verification/doctor/<str:user__id>/', views.AdminDocVerificationView.as_view(), name='admin-verification-doctor'),


    path("admin/doctor/verication/list/", views.AdminDoctorApprovalListView.as_view(), name="admin-verification-doctor-list"),

]