from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import QuerySet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
import json, Levenshtein
import numpy as np

from .models import Book
from .serializers import BookListSerializer

# 책 조회
@api_view(['GET'])
def books_list(request):
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookListSerializer(books, many=True)
    return Response(serializer.data)

# 베스트셀러 20위
@api_view(['GET'])
def books_list_popular(request):
    if request.method == 'GET':
        books = Book.objects.all()[:20]
        serializer = BookListSerializer(books, many=True)
    return Response(serializer.data)

# 유사도 행렬 만들기
def make_sim_matrix(data_file):
    sim_matrix = np.zeros((len(data_file),len(data_file)),dtype=object)

    for i in range(len(data_file)):
        for j in range(len(data_file)):
            similarity_lst = []
            for key in data_file[0].keys():
                if not key == 'id':
                    similarity = Levenshtein.distance(data_file[i][key],data_file[j][key])
                    similarity_lst.append(similarity)
            similarity_score = sum(similarity_lst)/len(similarity_lst)

            sim_matrix[i][j] = (j,similarity_score)
    return sim_matrix


# 추천하기
def recommend(isbn_num,data_file,sim_matrix):
  # isbn으로 책 인덱스 찾기
  book_idx = -1
  for i in range(len(data_file)):
      if data_file[i]['isbn'] == str(isbn_num):
          book_idx = i
          break

  if book_idx == -1:
      result = False
  else:
    required_lst = sim_matrix[book_idx]
    low_num_lst = sorted(required_lst, key=lambda x:x[1])[1:6]
    
    result = []
    for seq in low_num_lst:
        result.append(data_file[seq[0]])

  return result

@api_view(['GET'])
def books_list_similar(request, isbn_code):
    if request.method == 'GET':
        test_books = list(Book.objects.values())
        
        # 유사도 행렬
        sim_matrix = make_sim_matrix(test_books)
        
        # 추천 도서 목록
        recommend_lst = recommend(isbn_code,test_books,sim_matrix)
        if recommend_lst:
            json_data = json.dumps(recommend_lst)

            return HttpResponse(json_data, content_type='application/json')
        # db에 없는책이면
        else:
            return HttpResponse('db에 존재하는 책을 입력해주세요.')
    # return Response(serializer.data)

# def create_book_from_json(request):
#     with open('./data/books.json', 'r', encoding='utf-8-sig') as file:
#         data_file = json.load(file)
#         for dic in data_file:
#             book = Book(
#                 title=dic['title'],
#                 author=dic['author'],
#                 publisher=dic['publisher'],
#                 image_url=dic['image_url'],
#                 isbn=dic['isbn'],
#                 category=dic['category']
#             )
#             book.save()

#     return HttpResponse("Success! Books created from books.json file.")

