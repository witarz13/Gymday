from django.shortcuts import render
from rest_framework import generics, status
from .serializers import *
from .models import *
from rest_framework.views import APIView 
from rest_framework.response import Response 
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.generic import View
import datetime
# Create your views here.
class UserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
# class UserDelete(generics.CreateAPIView):
#     queryset=ActionTable.objects.all().delete()
#     serializer_class=CreateActionSerializer
class UserList(generics.ListAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
class UserBasicList(generics.ListAPIView):
    queryset=UserBasic.objects.all()
    serializer_class=UserBasicSerializer
class CreateAction(APIView):
    serializer_class=CreateActionSerializer
    def post(self, request, format=None):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            uid = serializer.data.get('UID')
            actionName = serializer.data.get('actionName')
            wegiht = serializer.data.get('weight')
            reps = serializer.data.get('reps')
            queryset=UserBasic.objects.filter(UID=uid)
            if queryset.exists():
                newaction=ActionTable(actionName=actionName,weight=wegiht,reps=reps,UID=uid,timeAdd=datetime.datetime.now())
                newaction.save()
                return Response(CreateActionSerializer(newaction).data,status=status.HTTP_201_CREATED)
            return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
class ViewAction(generics.ListAPIView):
    queryset=ActionTable.objects.all()
    serializer_class=ViewActionSerializer


class CreateUserView(APIView):
    serializer_class=CreateUserSerializer
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            UserName = serializer.data.get('username')
            PassWord = serializer.data.get('password')
            Email = serializer.data.get('email')
            Style = serializer.data.get('style')
            queryset = User.objects.filter(username=UserName)
            if not queryset.exists():
                newUser=User(username=UserName,password=make_password(PassWord),
                                  email=Email)
                newUser.save()

                return Response(UserSerializer(newUser).data,status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
class CreateUserBasicView(APIView):
    serializer_class=CreateUserBasicSerializer
    def post(self, request, format=None):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            style = serializer.data.get('style')
            queryset = UserBasic.objects.filter(username=username)
            if not queryset.exists():
                newUser=UserBasic(username=username,style=style)
                newUser.save()
                return Response(CreateUserBasicSerializer(newUser).data,status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
class Log_in(APIView):
    serializer_class=LoginSerializer
    
    def post(self, request, format=None):
        serializer=self.serializer_class(data=request.data)
        if serializer.is_valid():
            UserName = serializer.data.get('username')
            PassWord = serializer.data.get('password')
          
            
            user = authenticate(username=UserName, password=PassWord)
            if user is not None:
                try:
                    userinfo=UserBasic.objects.get(username=UserName)
                    data={
                            'username':userinfo.username,
                            'UID':userinfo.UID,
                            'likes':userinfo.likes,
                            'style':userinfo.style,
                            'login':True,
                        }
                    return JsonResponse(data)
                except userinfo.DoesNotExist:
                # 处理用户不存在的情况
                    return JsonResponse('error')
            else:
                return JsonResponse({'message': 'Login failed'}, status=401)
        
        return JsonResponse({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
class userActionList(View):
    def get(self, request, *args, **kwargs):
        uid_filter = self.kwargs.get('uid', None)

        if uid_filter is not None:
            try:
                uid_filter = int(uid_filter)
                data = ActionTable.objects.filter(UID=uid_filter).values()
                return JsonResponse(list(data), safe=False)
            except ValueError:
                return JsonResponse({'error': 'Invalid UID format'}, status=400)
        else:
            return JsonResponse({'error': 'UID not provided'}, status=400)