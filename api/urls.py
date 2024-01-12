from django.urls import path
from .views import *

urlpatterns = [
    path('',UserView.as_view()),
    path('/list',UserList.as_view()),
    path('/create',CreateUserView.as_view()),
    path('/login',Log_in.as_view()),
    # path('/delete',UserDelete.as_view()),
    path('/createbasic',CreateUserBasicView.as_view()),
    path('/listbasic',UserBasicList.as_view()),
    path('/creatAction',CreateAction.as_view()),
    path('/viewAction',ViewAction.as_view()),
    path('/userAction/<int:uid>/',userActionList.as_view(),name='your_list_view_with_uid'),
    
    
]