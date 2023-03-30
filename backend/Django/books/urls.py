from django.contrib import admin
from django.urls import path
from . import views

app_name = 'books'
urlpatterns = [
    path('booklist/', views.books_list),
    path('create_books/', views.create_book_from_json),
    path('create_matrix/',views.create_matrix),
    path('delete_matrix/',views.delete_matrix),
    path('recommend_books/',views.recommend_books),
    path('test_matrix/',views.test_matrix),
]

