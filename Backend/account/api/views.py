from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from account.models import User
from .serializers import UserRegisterSerializer
from django.contrib.auth import authenticate
import random
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed, ParseError


class getAccountsRoutes(APIView):
     def get(self, request, format=None):
        routes = [
        'api/accounts/login',
        'api/accounts/register',
                    ]
        return Response(routes)


class RegisterView(APIView):
    def post(self, request):
        print(request.data)
        serializer = UserRegisterSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            print('serilizer iis valid')
            serializer.save()
            # print(serializer.data)
            # random_num = random.randint(1000, 9999)
            # send_mail(
            #     "OTP AUTHENTICATING NaviGO",
            #     f"{random_num} -OTP",
            #     "luttapimalayali@gmail.com",
            #     [request.data['email']],
            #     fail_silently=False,
            # )
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE,)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()

        content = {'Message': 'User Registered Successfully',
                #    "otp": random_num,
                   "username": serializer.data['first_name']
                   }
        return Response(content, status=status.HTTP_201_CREATED,)
    


class UserLogin(APIView):

    def post(self, request):
        print(request.data)

        try:
            email = request.data['email']
            password = request.data['password']
            print(email, password)

        except KeyError:
            raise ParseError('All Fields Are Required')

        if not User.objects.filter(email=email).exists():
            # raise AuthenticationFailed('Invalid Email Address')
            return Response({'error': 'Email Does Not Exist'}, status=status.HTTP_403_FORBIDDEN)

        if not User.objects.filter(email=email, is_active=True).exists():
            raise AuthenticationFailed(
                'You are blocked by admin ! Please contact admin')

        user = authenticate(username=email, password=password)
        if user is None:
            raise AuthenticationFailed('Invalid Password')

        refresh = RefreshToken.for_user(user)
        print(request.data)

        refresh["first_name"] = str(user.first_name)
        # refresh["is_admin"] = str(user.is_superuser)

        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isAdmin': user.is_superuser,
        }
        print(content)
        return Response(content, status=status.HTTP_200_OK)