from django.db import models
# added
from django.contrib.auth.models import User

# Create your models here.
# because django is ORM(object relational mapping), it will automatically convert python code
# to django database using this class
class Todo(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(max_length=500) #default value can be blank=True
    created_at = models.DateTimeField(auto_now_add=True)
    # add for deadline???
    deadline = models.DateTimeField() #||| NANTI TAMBAH
    # foreignkey can link some user with some data that belongs to that user
    # on_delete: when we delete the data, it will also delete all of its related data 
    # or Todo class because of CASCADE attribute
    # related_name: what field name that references all of its todos list on the user
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="todos")
    #completed = models.BooleanField(default=False) #|||NANTI TAMBAH

    def __str__(self):
        return self.title