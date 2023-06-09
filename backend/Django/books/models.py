from django.db import models

# Create your models here.
class Book(models.Model):
  title = models.TextField()
  author = models.TextField()
  publisher = models.TextField()
  image_url = models.CharField(max_length=255)
  isbn = models.TextField()
  category = models.TextField()
  content = models.TextField()

class Matrix(models.Model):
  data = models.TextField()

class ID(models.Model):
  name = models.TextField()
  survey = models.TextField()
  read_books = models.TextField()
