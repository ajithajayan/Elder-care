from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from account.models import  Doctor, User
from .serializers import  AdminDocUpdateSerializer, UserDetailsUpdateSerializer, UserRegisterSerializer, UserSerializer
from django.contrib.auth import authenticate
import random
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed, ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.parsers import MultiPartParser, FormParser




class getAccountsRoutes(APIView):
     def get(self, request, format=None):
        routes = [
        'auth/login',
        'auth/register',
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
            'is_doctor': user.is_doctor(),
        }
        print(content)
        return Response(content, status=status.HTTP_200_OK)
    


# class UserDetailsUpdate(APIView):
#     permission_classes = [IsAuthenticated]
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request, *args, **kwargs):
#         user_profile = User.objects.get(id =request.user.id)[0]

     
        
#         user_update_details_serializer = UserDetailsUpdateSerializer(
#             user_profile, data=request.data, partial=True
#         )
        
       
#         if user_update_details_serializer.is_valid():
           
#             user_update_details_serializer.save()
#             return Response(user_update_details_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print('error', user_update_details_serializer.errors)
#             return Response(user_update_details_serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
class UserDetailsUpdate(generics.ListAPIView):
    queryset = User.objects.filter(user_type='doctor')
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = UserDetailsUpdateSerializer
    
class UseDetailsUpdate(generics.ListAPIView):
    queryset = User.objects.filter(user_type='client')
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = UserDetailsUpdateSerializer



class DocDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = UserDetailsUpdateSerializer
    lookup_field = 'pk'
    

class AdminDocUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Doctor.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = AdminDocUpdateSerializer
    lookup_field = 'pk'




    

class UserDetails(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = User.objects.get(id=request.user.id)
       
        data = UserSerializer(user).data
        try :
            profile_pic = user.profile_picture
            data['profile_pic'] = request.build_absolute_uri('/')[:-1]+profile_pic.url
        except:
            profile_pic = ''
            data['profile_pic']=''
            
        content = data
        return Response(content,status=status.HTTP_200_OK)
