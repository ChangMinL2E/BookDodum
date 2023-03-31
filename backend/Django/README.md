# Django SetUp

- 가상환경 셋팅

```bash
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
```

- 서버 실행

```bash
python manage.py makemigrations
python manage.py migrate

python manage.py loaddata books.json

python manage.py runserver
```

- api 명세서

> url : http://127.0.0.1:8000/books/booklist/  
> method : GET  
> &Rightarrow; 책 전체 목록 조회

> url : http://127.0.0.1:8000/books/recommend_books/  
> method : POST  
> body : {
> 'survey' : [초기 설문],
> 'read_books' : [등록한 책들]
> }  
> &Rightarrow; 사용자의 활동에 따른 추천 도서 20권  
> &rightarrow; import nltk 에러 뜨는 경우, books/views.py 15번 줄 주석풀고 한번 돌리시면 됩니다.

---

## 북,돋움 추천 알고리즘

- 기존 벡터 170개에 맞춰 도서 데이터 23016권 자연어 처리후 가중치 행렬 생성 (23016 X 170)
- 사용자 활동에 따른 가중치 행렬 생성 (170 X 1)
- 행렬곱 후 가장 관심있을만한 도서 20권 추천

---

## MVP 추천 알고리즘

- ### Levenshtein Distance
  : 도서 별로 dictionary 형태로 되어있는데, 각 id(pk) 제외하고, 책의 원소들끼리 유사도들의 평균으로 비교해서 가장 비슷한 책들을 추천해주는 알고리즘
