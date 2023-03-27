from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db.models import QuerySet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from collections import Counter
import json, Levenshtein
import numpy as np
import nltk

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

# 
def count_words_in_book(book, words):
    # 제목, 내용, 카테고리를 모두 합친 텍스트를 만듭니다.
    book = book['fields']
    print(book)
    text = f"{book['title']} {book['content']} {book['category']}"
    
    # 텍스트를 토큰화합니다.
    tokens = nltk.word_tokenize(text)
    
    # Counter를 이용해 토큰의 빈도수를 측정합니다.
    counter = Counter(tokens)
    
    # 결과를 저장할 리스트를 생성합니다.
    result = np.array([0]*len(words))
    
    # words 리스트에 포함된 단어들의 빈도수를 딕셔너리에 저장합니다.
    for i, word in enumerate(words):
        count = 0
        for key in counter.keys():
            if word in key:
                count += counter[key]
        result[i] = count
    
    if sum(result) == 0:
        return result
    else:
        return list(map(lambda x: x/sum(result), result))

def convert(o):
    if isinstance(o, np.int32):
        return int(o)
    elif isinstance(o, np.ndarray):
        return o.tolist()
    
@api_view(['GET'])
def create_matrix(request):
    if request.method == 'GET':
        # books = list(Book.objects.values())
        with open('books/fixtures/books.json', 'r', encoding="utf-8") as f:
            books = json.load(f)
        
        tokens = [
        '경제','경영','건강/취미','고전','과학','만화','달력','대학교재/전문서적','사회과학','소설/시/희곡',
        '수험서/자격증','어린어','에세이','여행','역사','예술/대중문화','요리/살림','외국어','유아',
        '인문학','자기계발','장르소설','잡지','전집/중고전집','종교/역학','좋은부모','청소년','컴퓨터/모바일',
        '초등학교','중학교','고등학교'
        ]

        books_matrix = []
        for book in books:
            arr = count_words_in_book(book, tokens)
            books_matrix.append(arr)
            if len(books_matrix) % 100 == 0:
                print(len(books_matrix))
        
        with open('total_array.json', 'w') as f:
            json.dump(books_matrix, f, default=convert)

        # return HttpResponse('matrix 생성중')
        return JsonResponse({'books_matrix': books_matrix})

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
#     with open('./data/merged_data.json', 'r', encoding='utf-8-sig') as file:
#         data_file = json.load(file)
#         for dic in data_file:
#             book = Book(
#                 title=dic['title'],
#                 author=dic['author'],
#                 publisher=dic['publisher'],
#                 image_url=dic['image_url'],
#                 isbn=dic['isbn'],
#                 category=dic['category'],
#                 content = dic['content']
#             )
#             book.save()

#     return HttpResponse("Success! Books created from books.json file.")

