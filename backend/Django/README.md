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

> url : http://127.0.0.1:8000/books/booklist  
> method : GET  
> &Rightarrow; 책 전체 목록 조회

> url : http://127.0.0.1:8000/books/popular/  
> method : GET  
> &Rightarrow; 베스트 셀러 20위 조회

> url : http://127.0.0.1:8000/books/similar/:isbncode  
> method : GET  
> &Rightarrow; isbncode를 입력한 책과 가장 유사한 책 5권 조회

---

## MVP 추천 알고리즘

- ### Levenshtein Distance
  : 도서 별로 dictionary 형태로 되어있는데, 각 id(pk) 제외하고, 책의 원소들끼리 유사도들의 평균으로 비교해서 가장 비슷한 책들을 추천해주는 알고리즘
