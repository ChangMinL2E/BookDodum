from time import time
from urllib.request import Request, urlopen
import asyncio
import requests
from bs4 import BeautifulSoup
import json


url = "https://www.aladin.co.kr/shop/common/wbest.aspx?BestType=Bestseller&BranchType=1&CID=0"
headers = {'X-Naver-Client-Id':'UIPoIiv42QxhN5yj0DwX','X-Naver-Client-Secret':"tLwrqPwG5g"}
aladin_url = 'https://www.aladin.co.kr'
isbn_lst = []
books = []
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
left_Bar = soup.find('ul','best_left_ul').find_all('a')
left_Bar = list(map(lambda x: x['href'],left_Bar))

async def data_crawling(number):
  books = []
  url = aladin_url+left_Bar[number-1]+'&page='
  # print(url)
  for i in range(1,21):
    response = requests.get(url+str(i))
    soup = BeautifulSoup(response.content, 'html.parser')\

    tests = soup.find_all("div",{"class":"ss_book_box"})
    if tests == []:
      break
    # print(i)
    for test in tests:
      try:

        # a태그
        src_link = test.find("a")['href']
        # print(src_link)
        new_url = src_link
        response2 = requests.get(new_url)
        soup2 = BeautifulSoup(response2.content, 'html.parser')
        
        # 카테고리
        category = soup2.find("ul",{"id":"ulCategory"}).find_all('li')
        # print(list(map(lambda x: x.text,category)))
        category = list(map(lambda x: x.text.replace("\xa0","").split(">")[1].strip(),category))
        category = sorted(list(set(category)))

        # isbn
        isbn = soup2.find("div",{"class":"conts_info_list1"}).text.split("ISBN")[-1].split(':')[-1].strip()
        
        if not isbn in isbn_lst:
          try:
            naver_url = f'https://openapi.naver.com/v1/search/book.json?query={isbn}'
            naver_response = requests.get(naver_url,headers=headers)

            title = naver_response.json()['items'][0]['title']
            image_url = naver_response.json()['items'][0]['image']
            author = naver_response.json()['items'][0]['author']
            publisher = naver_response.json()['items'][0]['publisher']
            content = naver_response.json()['items'][0]['description']

            isbn_lst.append(isbn)
            books.append({'title': f'{title}',
                          'author': f'{author}',
                          'content': f'{content}',
                          'publisher': f'{publisher}',
                          'image_url': f'{image_url}',
                          'isbn': f'{isbn}',
                          'category': f'{category}'})
            print(len(books),f': {books[-1]}')
          except:
            pass
      except:
        pass
  
  with open(f'data{number}.json', 'w', encoding='UTF-8-sig') as file:
    file.write(json.dumps(books, ensure_ascii=False))
  print(f'finish {number}')

data_crawling(1)

# urls = ['https://www.google.co.kr/search?q=' + i
#         for i in ['apple', 'pear', 'grape', 'pineapple', 'orange', 'strawberry']]

# async def fetch(url):
#     request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})    # UA가 없으면 403 에러 발생
#     response = await loop.run_in_executor(None, urlopen, request)    # run_in_executor 사용
#     page = await loop.run_in_executor(None, response.read)           # run in executor 사용
#     return len(page)

async def main():
    futures = [asyncio.ensure_future(data_crawling(i)) for i in range(1,31)]
                                                           # 태스크(퓨처) 객체를 리스트로 만듦
    result = await asyncio.gather(*futures)                # 결과를 한꺼번에 가져옴
    print(result)

begin = time()
loop = asyncio.get_event_loop()          # 이벤트 루프를 얻음
# loop = asyncio.new_event_loop()          # 이벤트 루프를 얻음
# ansyncio.set_
loop.run_until_complete(main())          # main이 끝날 때까지 기다림
loop.close()                             # 이벤트 루프를 닫음
end = time()
print('실행 시간: {0:.3f}초'.format(end - begin))