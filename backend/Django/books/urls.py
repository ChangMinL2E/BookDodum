from django.contrib import admin
from django.urls import path
from . import views

app_name = 'books'
urlpatterns = [
    path('booklist/', views.books_list),
    path('popular/',views.books_list_popular),
    path('similar/<str:isbn_code>/',views.books_list_similar)
    # path('create_books/', views.create_book_from_json),
]

