# setting up the url for linking to the database on api
from django.urls import path
from . import views

urlpatterns = [
    # path for viewing, creating, or listing todos
    path("todos/", views.TodoListCreate.as_view(), name = "todo-list"),
    # path for deleting todo (pk: primary key)
    path("todos/delete/<int:pk>/", views.TodoDelete.as_view(), name = "delete-todo"),
]