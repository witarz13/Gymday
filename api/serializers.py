from rest_framework import serializers
from .models import UserBasic
from .models import ActionTable
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= ('username','password','email')
class UserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBasic
        fields= ('UID','username','likes','style')
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password','email')
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField()
class traceDataSerializer(serializers.Serializer):
    UID=serializers.IntegerField()
class CreateUserBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBasic
        fields= ('username','style')
class CreateActionSerializer(serializers.ModelSerializer):
    class Meta:
        model=ActionTable
        fields=('UID','actionName','weight','reps')
class ViewActionSerializer(serializers.ModelSerializer):
    class Meta:
        model=ActionTable
        fields=('UID','actionName','weight','reps','timeAdd')
