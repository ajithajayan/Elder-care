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
    path("login", views.UserLogin.as_view(), name="user-login"),

]