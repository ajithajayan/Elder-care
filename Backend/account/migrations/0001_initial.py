# Generated by Django 5.0.1 on 2024-03-03 11:31

import datetime
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(blank=True, max_length=50)),
                ('password', models.CharField(max_length=100)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('gender', models.CharField(choices=[('male', 'Male'), ('female', 'Female')], default='male', max_length=10)),
                ('phone_number', models.CharField(blank=True, max_length=12, null=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('user_type', models.CharField(choices=[('admin', 'Admin'), ('client', 'Client'), ('doctor', 'Doctor'), ('caretaker', 'Caretaker')], default='client', max_length=20)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pictures/')),
                ('approval_status', models.CharField(choices=[('PENDING', 'Pending'), ('APPROVED', 'Approved'), ('REJECTED', 'Rejected')], default='PENDING', max_length=20)),
                ('street', models.CharField(blank=True, max_length=255, null=True)),
                ('city', models.CharField(blank=True, max_length=255, null=True)),
                ('state', models.CharField(blank=True, max_length=255, null=True)),
                ('zip_code', models.CharField(blank=True, max_length=20, null=True)),
                ('country', models.CharField(blank=True, max_length=255, null=True)),
                ('is_id_verified', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now_add=True)),
                ('last_login', models.DateTimeField(auto_now_add=True)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_email_verified', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('custom_id', models.CharField(editable=False, max_length=10, primary_key=True, serialize=False, unique=True)),
                ('full_name', models.CharField(max_length=255)),
                ('blood_group', models.CharField(choices=[('A+', 'A+'), ('A-', 'A-'), ('B+', 'B+'), ('B-', 'B-'), ('O+', 'O+'), ('O-', 'O-'), ('AB+', 'AB+'), ('AB-', 'AB-')], default='A+', max_length=5)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='patient_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Verification',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='doc_verification', serialize=False, to=settings.AUTH_USER_MODEL)),
                ('aadhar_file', models.FileField(blank=True, null=True, upload_to='verification_documents/aadhar')),
                ('degree_certificate', models.FileField(blank=True, null=True, upload_to='verification_documents/degree')),
                ('experience_certificate', models.FileField(blank=True, null=True, upload_to='verification_documents/experience')),
                ('is_verified', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('custom_id', models.CharField(editable=False, max_length=10, primary_key=True, serialize=False, unique=True)),
                ('full_name', models.CharField(max_length=255)),
                ('specializations', models.CharField(choices=[('Cardiologist', 'Cardiologist'), ('Dermatologist', 'Dermatologist'), ('Neurologist', 'Neurologist'), ('Orthopedic Surgeon', 'Orthopedic Surgeon'), ('Ophthalmologist', 'Ophthalmologist'), ('Gastroenterologist', 'Gastroenterologist'), ('Endocrinologist', 'Endocrinologist'), ('Pulmonologist', 'Pulmonologist'), ('Nephrologist', 'Nephrologist'), ('Pediatrician', 'Pediatrician'), ('Psychiatrist', 'Psychiatrist'), ('General', 'General'), ('Rheumatologist', 'Rheumatologist'), ('Hematologist', 'Hematologist'), ('Urologist', 'Urologist'), ('Otolaryngologist', 'Otolaryngologist'), ('Radiologist', 'Radiologist')], default='General', max_length=30)),
                ('consultaion_fees', models.DecimalField(decimal_places=0, default=300, max_digits=10)),
                ('consultation_duration', models.DurationField(default=datetime.timedelta(seconds=3600))),
                ('consultation_slots', models.IntegerField(default=5)),
                ('education', models.TextField(blank=True, max_length=50, null=True)),
                ('college_name', models.TextField(default='Not Available', max_length=50)),
                ('years_of_experience', models.IntegerField(default=0)),
                ('about_me', models.CharField(blank=True, max_length=255, null=True)),
                ('Hospital', models.TextField(blank=True, max_length=50, null=True)),
                ('consultation_time', models.TextField(default='10AM to 5PM', max_length=50)),
                ('rating', models.IntegerField(default=4)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='doctor_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OTPModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('otp', models.IntegerField()),
                ('timestamp', models.DateTimeField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Wallet',
            fields=[
                ('patient', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='wallet_user', serialize=False, to='account.patient')),
                ('balance', models.IntegerField(default=0)),
            ],
        ),
    ]
