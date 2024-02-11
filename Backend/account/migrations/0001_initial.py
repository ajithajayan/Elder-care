# Generated by Django 5.0.1 on 2024-02-09 14:04

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
                ('phone_number', models.CharField(blank=True, max_length=12, null=True, unique=True)),
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
            name='Verification',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('aadhar_card_number', models.CharField(blank=True, max_length=255, null=True)),
                ('aadhar_file', models.FileField(blank=True, null=True, upload_to='verification_documents/aadhar')),
                ('license_number', models.CharField(blank=True, max_length=255, null=True)),
                ('license_file', models.FileField(blank=True, null=True, upload_to='verification_documents/license')),
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
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('custom_id', models.CharField(editable=False, max_length=10, primary_key=True, serialize=False, unique=True)),
                ('full_name', models.CharField(max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
