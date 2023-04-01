from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.db.models import QuerySet
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from collections import Counter
import json, Levenshtein
import numpy as np
import nltk
import time
# nltk.download('punkt')

from .models import Book, Matrix, ID
from .serializers import BookListSerializer

tokens = ["IT", "SF", "가계부", "가상화폐", "개발", "건강/취미", "건축", "게임", "경제경영", "고객", "고등학교참고서", "고사성어", "고전", "공포", "과학/수학/생태", "관계", "관광", "광고", "교양", "교육", "국내도서", "금융", "기계", "기술공학", "기업", "기획", "낚시", "네트워크", "다이어트", "달력/기타", "대학교재/전문서적", "데이터베이스", "돈", "동양사", "두뇌", "등산", "로맨스", "리더십", "마음", "마케팅", "만화", "머니", "면역", "무역", "문화", "물리", "미스터리", "방송", "배낭", "범죄", "법", "보안", "보험", "복지", "부,", "부동산", "비즈니스", "사랑", "사진", "사회과학", "생물", "성공", "세계사", "세무", "세일즈", "소설/시/희곡", "속담", "수필", "수험서/자격증", "스릴러", "스포츠", "슬픔", "승리", "시간", "신문", "액션", "어린이", "에세이", "여행", "역사", "역학", "연극", "영어", "영화", "예술/대중문화", "외교", "외국어", "요리/살림", "운동", "운송", "운전", "원예", "웹", "유아", "유통", "육아", "의류", "의학", "이론", "인간관계", "인문", "인문학", "인적성", "인테리어,", "임신", "자격증", "자기계발", "자연", "자존감", "잡지", "재미", "재테크", "전기", "전자", "전집/중고전집", "정보", "정책", "정치", "종교/역학", "좋은부모", "주식", "중학교참고서", "직무능력", "창업", "철학", "청소년", "체육", "초등학교참고서", "추리", "추천도서", "출산", "취업", "컴퓨터/모바일", "퀴즈", "테마", "투자", "트레이닝", "트렌드", "판타지", "패션", "퍼즐", "펀드", "프레젠테이션", "프로그래밍", "한국관련도서", "한국사", "해킹", "행복", "행정", "협상", "화술", "화학", "회계", "힐링"]
survey_dic = {
    '여성' : ['자기계발','로맨스','소설/시/희곡'],
    '남성' : ['소설/시/희곡','경제경영','스포츠','역사'],
    '힐링' : ['힐링'],
    '사회과학':['사회과학'],
    '자기계발' : ['자기계발'],
    '재미' : ['게임','만화','추리','판타지'],
    '스펙' : ['수험서/자격증'],
    '자존감' : ['자기계발'],
    '행복' : ['행복'],
    '사랑' : ['소설/시/희곡'],
    '심심' : ['게임','만화','추리'],
    '우울' : ['소설/시/희곡', '수필'],
    '답답' : ['소설/시/희곡', '수필'],
    '이별' : ['소설/시/희곡', '수필'],
    '불안' : ['힐링'],
    '스트레스' : ['공포','스릴러'],
    '경제':['경제경영','금융'],
    'SF':['SF'],
    '수필/에세이' : ['수필', '소설/시/희곡'],
    '운동': ['건강/취미','다이어트','운동'],
    '인테리어':['인테리어'],
    '일상':['여행'],
    '범죄/추리':['범죄','추리']
}
# 책 조회
@api_view(['GET'])
def books_list(request):
    if request.method == 'GET':
        books = Book.objects.all()
        serializer = BookListSerializer(books, many=True)
    return Response(serializer.data)

def count_words_in_book(book, words):
    # 제목, 내용, 카테고리를 모두 합친 텍스트를 만듭니다.
    text = f"{book['title']} {book['content']} {book['category']}"
    
    # 토큰화
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
        books = list(Book.objects.values())

        books_matrix = []
        for book in books:
            arr = count_words_in_book(book, tokens)
            books_matrix.append(list(arr))
            if len(books_matrix) % 100 == 0:
                print(len(books_matrix))
        # print(books_matrix)
        # books_matrix = list(map(lambda x: convert(x), books_matrix))

        matrix = Matrix(
            data = books_matrix
        )
        matrix.save()    

        return HttpResponse('matrix 생성중')

def create_book_from_json(request):
    with open('./data/merged_data.json', 'r', encoding='utf-8-sig') as file:
        data_file = json.load(file) 
        # data_file = data_file[:100]
        for dic in data_file:
            book = Book(
                title=dic['title'],
                author=dic['author'],
                publisher=dic['publisher'],
                image_url=dic['image_url'],
                isbn=dic['isbn'],
                category=dic['category'],
                content = dic['content']
            )
            book.save()

    return HttpResponse("Success! Books created from books.json file.")

def test_matrix(request):
    # with open('./data/array.json','r',encoding='utf-8-sig') as file:
    #     data_file = json.load(file)
    matrix = list(Matrix.objects.values())
    print(type(matrix[0]['data']))
    with open('matrix2.json','w',encoding='utf-8-sig') as file:
        json.dump(matrix[0]['data'], file)
        
        # matrix = Matrix(
        #     data = data_file
        # )
        # matrix.save()
        # print(data_file)
        
    return HttpResponse("행렬 읽어짐.")

@api_view(['DELETE'])
def delete_matrix(request):
    matrix = Matrix.objects.all()
    matrix.delete()

    return HttpResponse('행렬 삭제.')

def recommend_books(request, user_id):
    user_data = list(ID.objects.filter(name=user_id))
    if len(user_data) == 0:
        return HttpResponse('존재하지 않은 유저입니다.')
    
    survey = user_data[-1].survey
    read_books = user_data[-1].read_books

    user_matrix = [0]*len(tokens)
    books = Book.objects.values()

    # 초기설문
    # survey = request.POST.get('survey')
    array = list(eval(survey))

    for arr in array:
        try:
            for dic_key in survey_dic[arr]:
                user_matrix[tokens.index(dic_key)] += 0.2
        except:
            if arr in tokens:
                user_matrix[tokens.index(arr)] += 0.2
            else:
                pass
    
    # 읽은 책들
    matrix = list(Matrix.objects.values())
    matrix = matrix[0]['data']
    matrix = np.array(json.loads(matrix))
    user_books = []

    if not read_books == '':
        user_matrix = np.array(user_matrix)
        read_books = list(eval(read_books))
        user_books = read_books[:]
        for isbn_code in read_books:
            book = list(Book.objects.filter(isbn=isbn_code))
            user_matrix += matrix[book[0].id-1]*5

    user_matrix = list(user_matrix)
    # 에러 방지
    if sum(user_matrix) == 0:
        user_matrix = np.array([0.00001]*len(user_matrix))
    user_matrix = list(map(lambda x: x/sum(user_matrix),user_matrix))
    user_matrix = np.array(user_matrix)
    
    C = np.dot(matrix, user_matrix)
    C = list(enumerate(C))
    C = sorted(C,key=lambda x: x[1], reverse=True)[:20]

    for book_idx in range(len(user_books)):
        data = Book.objects.get(isbn=user_books[book_idx])
        user_books[book_idx] = data.id

    lst = []
    for tu in C:
        if not int(tu[0]) in user_books:
            lst.append(books[tu[0]])

    json_data = json.dumps(lst)

    return HttpResponse(json_data, content_type='application/json')

@method_decorator(csrf_exempt, name='dispatch')
def register_data(request):
    body_unicode = request.body.decode('utf-8')
    dict_data = json.loads(body_unicode)

    # user_id = request.POST.get('name')
    user_id = dict_data.get('name')
    # survey = request.POST.get('survey')
    survey = dict_data.get('survey')
    # read_books = request.POST.get('read_books')
    read_books = dict_data.get('read_books')
    survey = list(eval(survey))
    if survey:
        impressive_book = survey.pop(-1)
        token = nltk.word_tokenize(impressive_book)
        
        # Counter를 이용해 토큰의 빈도수를 측정합니다.
        counter = Counter(token)
        for key in counter.keys():
            for _ in range(counter[key]):
                survey.append(key)
    
    # 존재 여부
    test_data = list(ID.objects.filter(name=user_id))
    

    # 없는 데이터 등록이라면,
    if len(test_data) == 0:
        # 등록한 책 없는 경우,
        if not read_books:
            data = ID(
                name = user_id,
                survey = survey,
                # isbn_books = isbn_books
            )

        # 읽은 책 등록한 경우,
        else:
            data = ID(
                name = user_id,
                survey = survey,
                read_books = read_books
            )
        data.save()
        return HttpResponse('등록 완료.')
    # 이미 존재한다면,
    else:
        if not survey:
            survey = test_data[-1].survey
        
        if not read_books:
            data = ID(
                name = user_id,
                survey = survey,
                # isbn_books = isbn_books
            )

        # 읽은 책 등록한 경우,

        else:
            data = ID(
                name = user_id,
                survey = survey,
                read_books = read_books
            )

        data.save()
        
        return HttpResponse('데이터 추가 저장')

def update_matrix(request):
    matrix = list(Matrix.objects.values())
    matrix = matrix[0].get('data')
    # 현재 배열 불러옴.
    lst = list(json.loads(matrix))
    
    # print(matrix[0].get('data'))

    json_data = json.dumps(lst)

    return HttpResponse(json_data, content_type='application/json')
    # return HttpResponse('matrix 불러옴')

@method_decorator(csrf_exempt, name='dispatch')
def add_book(request):
    body_unicode = request.body.decode('utf-8')
    dict_data = json.loads(body_unicode)

    user_id = dict_data.get('name')
    isbn = dict_data.get('isbn')
    print(isbn)

    user_books = list(ID.objects.filter(name=user_id))
    print(user_books[-1])
    print(user_books[-1].get('read_books'))

    return HttpResponse("일단 코드 돌아감.")