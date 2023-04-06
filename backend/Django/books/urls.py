from django.contrib import admin
from django.urls import path
from . import views

app_name = 'books'
urlpatterns = [
    path('booklist/', views.books_list),
    path('create_books/', views.create_book_from_json),
    path('create_matrix/',views.create_matrix),
    path('delete_matrix/',views.delete_matrix),
    path('test_matrix/',views.test_matrix),
    path('register_data/',views.register_data),
    path('recommend_books/<str:user_id>/',views.recommend_books),
    path('update_matrix/',views.update_matrix),
    path('add_book/',views.add_book)
]

