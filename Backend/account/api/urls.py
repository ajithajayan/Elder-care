from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    
    path("", views.getAccountsRoutes.as_view(), name="accounts-routes"),
    path("register", views.RegisterView.as_view(), name="user-register"),
    path("user/details/", views.UserDetails.as_view(), name="user-details"),
    path("doctors/details/", views.UserDetailsUpdate.as_view(), name="doctors-details"),
    path("use/details/", views.UseDetailsUpdate.as_view(), name="use-details"),
    path("login", views.UserLogin.as_view(), name="user-login"),
    path("user/update/<str:pk>", views.UserDetailsUpdate.as_view(), name="user-update"),
    path("user/list/<str:pk>", views.UserDetailsUpdate().as_view(), name="user-list"),

    

    path("doc/list/<str:pk>", views.DocDetailsUpdate().as_view(), name="doc-list"),
    path("doc/update/<str:pk>", views.DocDetailsUpdate().as_view(), name="doc-update"),



    path("admin/doc/<str:pk>", views.AdminDocUpdate().as_view(), name="adminDoc-update"),


]