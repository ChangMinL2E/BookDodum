# 북돋움

![로고](images/logo-dark.png)

<br/>
<br/>

## Book Dodum

> #### **"종이책을 즐겨읽는 사용자를 위한 빅데이터 기반 도서 추천 및 독서 모임 서비스"<br/>**
>
> <b style="color:#555555">프로젝트 기간 : 2023.03.06 ~ 2023.04.07</b>

<br/>

_북돋움은 사용자의 행동을 기반으로 **개인 맞춤형 도서 추천**을 제공하는 도서 추천 서비스 입니다. 북돋움에서는 동일한 책을 읽은 다른 사용자와 함께 **독서모임**에 참여할 수 있습니다. 사람들과 생각을 나누며, N권을 읽은 효과를 느껴보세요! 또한 독서를 끝내고 떠오르는 책의 분위기를 한 줄로 입력해 DALL-E가 변환해 주는 감성적인 이미지도 제공받을 수 있습니다. 쌓여가는 책을 '내 책방' 에서 확인해 보는 재미도 쏠쏠하답니다 :)_

<br/>
<br/>

---

<br/>
<br/>

## **Stacks**

#### **Environment**

<div style='display:flex;margin-bottom:20px'>
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/VScode-007ACC?style=for-the-badge&logo=visualstudio&logoColor=white">
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/intelliJ-000000?style=for-the-badge&logo=intellijidea&logoColor=white">
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=git&logoColor=white">
<img  style="margin:0 5px 0 0"src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

#### **CI/CD**

<div style='display:flex;margin-bottom:20px'>
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/EC2-ff9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white">
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/docker-2496ed?style=for-the-badge&logo=docker&logoColor=white">

</div>

#### **Development**

<div style='display:flex;margin-bottom:20px'>
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/java-007396?style=for-the-badge&logoColor=white">
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/typeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white">
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img  style="margin:0 5px 0 0"src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img  style="margin:0 5px 0 0"src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img  style="margin:0 5px 0 0"src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">
</div>

#### **Comunication**

<div style='display:flex;margin-bottom:20px'>
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jirasoftware&logoColor=white">
<img style="margin:0 5px 0 0" src="https://img.shields.io/badge/NOTION-000000?style=for-the-badge&logo=notion&logoColor=white">
<img  style="margin:0 5px 0 0"src="https://img.shields.io/badge/DISCORD-5865F2?style=for-the-badge&logo=discord&logoColor=white">
</div>

<br/>
<br/>

---

<br/>
<br/>

## 주요 기능 📦

> ### 추천 기능

<div style="margin:10px 0 20px 0;display:flex">
 <img style="margin: 0 10px 0 0" src='images/survey.gif' width="200px"/>
 <img style="margin: 0 10px 0 0" src='images/result.gif' width="200px"/>
</div>


데이터베이스에 존재하는 책마다 미리 만들어놓은 벡터들과 자연어처리한 토큰들로 고유한 행렬을 만들고, 유저 활동을 벡터별 가중치를 만들어서 이를 이용한 추천을 진행하고 있습니다.

```
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
```

<br/>

> ### 독서 모임

<div style="margin:10px 0 20px 0;display:flex">
 <img style="margin: 0 10px 0 0" src='images/survey.gif' width="200px"/>
 <img style="margin: 0 10px 0 0" src='images/result.gif' width="200px"/>
</div>

현재 읽고 있는 책을 중심으로 독서 모임을 생성하고, 생각을 나눌 수 있습니다. <br> 비공개로 설정한 모임에는 책을 읽었거나, 읽고 있는 사용자만 글을 작성할 수 있습니다.

<br/>

> ### 독후감 작성

<div style="margin:10px 0 20px 0;display:flex">
 <img style="margin: 0 10px 0 0" src='images/write.png' width="200px"/>
 <img style="margin: 0 10px 0 0" src='images/dalle.gif' width="320px"/>
</div>

책을 읽으면서 독후감 페이지에서 독후감을 작성할 수 있습니다. <br> 책을 다 읽은 후 가장 기억에 남는 장면을 작성하면 이미지로 변환해줍니다.  

<br/>
<br/>

---

<br/>
<br/>

## 기대효과 🔔
<br/>

>### 추천

추천을 통해 책을 고르는 시간을 아낄 수 있습니다.<br> 또한 유저간에 무슨 책을 읽었는지, 다음에 무슨 책을 읽었는지 알 수 있어 다양한 분야의 책을 읽으며 식견을 넓힐 수 있습니다. 

<br/>

>### 독서모임

자신의 생각을 표현하며 한 번 더 책을 소화할 수 있습니다. <br> 이러한 생각을 사람들과 함께 공유함으로써 책 한권이 아닌 N권을 읽는 효과를 낼 수 있습니다. 

<br/>

>### 독후감작성

기록하지 않으면 기억에 잘 남지 않습니다. <br> 따라서 책을 읽을 때마다 독후감을 작성함으로써 오래 기억할 수 있게 합니다. 추가로 텍스트를 이미지로 변환해줌으로써 기억할 수 있는 효과를 극대화 해 줄 수 있습니다. 

<br/>
<br/>


---

## 아키텍처 설계도

![아키텍처 설계도](images/architecture.png)

<br/>
<br/>

---
## 와이어프레임 

![와이어 프레임](images/wireframe.png)

<br/>
<br/>

--- 

<br/>
<br/>




## 팀원 소개

|    <img src='images/ziu.png' width='150px'>    |  <img src='images/yunam.png' width='150px'>  |    <img src='images/hye.png' width='150px'>    |     <img src='images/woogie.png' width='150px'>     |     <img src='images/won.png' width='150px'>     |    <img src='images/chang.png' width='150px'>    |
| :--------------------------------------------: | :-----------------------------------------: | :--------------------------------------------: | :-------------------------------------------------: | :----------------------------------------------: | :----------------------------------------------: |
| **[FE 최지우👑](https://github.com/choizlor)** | **[FE 김유나](https://yunae.tistory.com/)** | **[FE 나혜승](https://github.com/HyeseungNA)** | **[BE 최종욱](https://whitedevelper.tistory.com/)** | **[BE 이원석](https://github.com/wonseokLee97)** | **[AI 이창민](https://changmiin2.tistory.com/)** |

<br/>
<br/>

---
