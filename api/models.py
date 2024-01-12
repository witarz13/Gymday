from django.db import models


# Create your models here.
class UserBasic(models.Model):
    UID=models.AutoField(primary_key=True, auto_created=True)
    username=models.CharField(max_length=255,null=False)
    likes=models.IntegerField(max_length=10,default=0)
    style=models.CharField(max_length=20,default='extreme')


    def __str__(self):
        return  'ID: '+str(self.UID)+'  Username: '+str(self.username) + ' style: '+str(self.style)

class ActionTable(models.Model):
    actionName=models.CharField(max_length=255,null=False)
    weight=models.IntegerField(max_length=4,default=0)
    reps=models.IntegerField(max_length=2,default=0)
    UID=models.IntegerField(null=False)
    timeAdd=models.DateTimeField(null=False)
    def __str__(self):
        return 'ID: '+str(self.UID)+ ' Action: '+ str(self.actionName)+ 'Weight: '+ str(self.weight) +'Resp: '+str(self.reps) +' Time: '+str(self.timeAdd)