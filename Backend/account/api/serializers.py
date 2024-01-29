from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
from account.models import User,Address

from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken, Token,AccessToken
from django.core.validators import RegexValidator



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['first_name'] = user.first_name
        # ...
        
        return token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)


        
class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'is_active', 'first_name', 'last_name','user_type']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):
        validated_data['password'] = make_password(
            validated_data.get('password'))
        validated_data['is_active'] = True
        return super(UserRegisterSerializer, self).create(validated_data)


class UserDetailsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['address','first_name', 'last_name', 'profile_picture', 'date_of_birth', 'username']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['street', 'city', 'state', 'country', 'zip_code']

class UserDetailWithAddressSerializer(serializers.ModelSerializer):
    address = AddressSerializer(many=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'user_type', 'address']

    def create(self, validated_data):
        address_data = validated_data.pop('address')
        user = User.objects.create(**validated_data)
        for track_data in address_data:
            Address.objects.create(user=user, **track_data)
        return user    
        
