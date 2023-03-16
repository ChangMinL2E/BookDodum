import json
import numpy as np
import difflib
import Levenshtein

with open('books.json','r',encoding='utf-8-sig') as file:
    data_file = json.load(file)

# 유사도 행렬
sim_matrix = np.zeros((len(data_file),len(data_file)),dtype=object)

for i in range(len(data_file)):
    for j in range(len(data_file)):
      similarity_lst = []
      for key in data_file[0].keys():
          similarity = Levenshtein.distance(data_file[i][key],data_file[j][key])
          similarity_lst.append(similarity)
      similarity_score = sum(similarity_lst)/len(similarity_lst)

      sim_matrix[i][j] = (j,similarity_score)

# 가장 유사한 5권 추천해주는 함수
def recommend(isbn_num):
  # isbn으로 책 인덱스 찾기
  book_idx = -1
  for i in range(len(data_file)):
      if data_file[i]['isbn'] == str(isbn_num):
          book_idx = i
          break
  
  required_lst = sim_matrix[book_idx]
  low_num_lst = sorted(required_lst, key=lambda x:x[1])[1:6]
  
  result = []
  for seq in low_num_lst:
    result.append(data_file[seq[0]])

  return result

recommend(9791167223524)

print(Levenshtein.distance(1,2))


