# this is for credential access of the user
# serializers is something that can take python object and convert it into json data
# that can be used in communication between app
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Todo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # main data that want to be stored
        fields =["id", "username","password"]
        extra_kwargs = {"password":{"write_only": True}} #so that user can only write not read the pass

    # to implement the method that will be called when we want to create new version of the user
    # it will pass the checked validated_data from serializers.ModelSerializer class
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) #** is for splitting up the key argument and pass them in form of dictionary
        return user
    
# define todo class for serializer
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id","title","content","created_at","author","deadline"] #,"completed"]
        # gak tau ini perlu atau nggak, soalnya nanti perlu ngerubah complete enggaknya
        extra_kwargs = {"author": {"read_only":True}}