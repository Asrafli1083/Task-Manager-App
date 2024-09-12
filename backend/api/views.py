from django.shortcuts import render
# added these
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, TodoSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Todo

# Create your views here.
# create a todo class for views for CRUD
# use ListCreateAPIView to list all of the notes that user has created/create new note
class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    # cannot call the roots unless authenticated and pass JWT token
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # this expr will only return the notes written by the user
        return Todo.objects.filter(author=user)
    # to configure when create a new user
    # this func will check if the data is valid/accurate or not
    def perform_create(self, serializer):
        # if its valid, we will save the serializer and will make new version of the todos
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class TodoDelete(generics.DestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        # this expr will only return the notes written by the user
        return Todo.objects.filter(author=user)    

# built in func from django to automatically handle creating new user/object
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    # connecting our auth routes
    serializer_class = UserSerializer #type of data that will be create is User type object
    permission_classes = [AllowAny] #we will allow anyone who has permission to continue
