import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.


class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, email, phone_number, password=None, date_of_birth=None, profile_picture=None, user_type='client', approval_status='PENDING'):
        if not email:
            raise ValueError('User must have an email address')
        if not phone_number:
            raise ValueError('User must have a phone number')

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            phone_number=phone_number,
            date_of_birth=date_of_birth,
            profile_picture=profile_picture,
            user_type=user_type,
            approval_status=approval_status,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, email, phone_number, password, date_of_birth=None, profile_picture=None, user_type='admin', approval_status='APPROVED'):
        user = self.create_user(
            email=self.normalize_email(email),
            first_name=first_name,
            phone_number=phone_number,
            password=password,
            date_of_birth=date_of_birth,
            profile_picture=profile_picture,
            user_type=user_type,
            approval_status=approval_status,
        )
        user.is_active = True
        user.is_superuser = True
        user.is_email_verified = True
        user.is_staff = True
        user.save(using=self._db)
        return user

# Approval status choices should not include 'APPROVAL_' prefix, as it is already specified in the default value
APPROVAL_STATUS_CHOICES = [
    ('PENDING', 'Pending'),
    ('APPROVED', 'Approved'),
    ('REJECTED', 'Rejected'),
]

class User(AbstractBaseUser):
    USER_TYPE_CHOICES = [
        ('admin', 'Admin'),
        ('client', 'Client'),
        ('doctor', 'Doctor'),
        ('caretaker', 'Caretaker'),
    ]

    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    username = models.CharField(max_length=50, blank=True)
    password = models.CharField(max_length=100)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True)
    phone_number = models.CharField(max_length=12, unique=True, blank=True, null=True)
    email = models.EmailField(max_length=100, unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='client')
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    approval_status = models.CharField(
        max_length=20,
        choices=APPROVAL_STATUS_CHOICES,
        default='PENDING',
    )
    is_id_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now_add=True)
    is_superuser = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number', 'first_name']

    objects = MyAccountManager()

    def __str__(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, add_label):
        return True

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=255)
