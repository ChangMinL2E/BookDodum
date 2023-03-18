import React, { useState } from "react";
import styled from "styled-components";
import sample from "../../Assets/Images/sample.png";

// Styled Components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 5% auto 10% auto;
`
const Title = styled.div`
  font-size: 16px;
  color: #5c5649;
  font-weight: bold;
  width: 90%;
  margin: 5% auto;
`;

const List = styled.div`
  width: 100%;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Book = styled.div`
  width: 130px;
  margin: auto 5%;
`;

const BookImage = styled.div`
  width: 130px;
  height: 185px;
  background-image: url(${sample});
  background-size: contain;
  box-shadow: 2px 5px 4px 0px #00000040;
`;

const BookTitle = styled.div`
  font-size: 14;
  font-weight: bold;
  margin-top: 10%;
`;

const Categories = styled.div`
  display: flex;
`;

const Category = styled.div`
  font-size: 10px;
  border: solid #5c5649 1px;
  border-radius: 20px;
  margin: 3% 3% 3% 0;
  display: flex;
  align-items: center;
  padding: 2% 5%;
`;

const Company = styled.div`
  font-size: 11px;
  color: #9b9b9b;
  margin-top:2%;
`;

// 타입선언
type Book = {
  imageUrl : String;
  title : String;
  categories : String[];
  company : String;
}


// 컴포넌트 정의
export default function BookList() {
  const [books , setBooks] = useState<Book[]>([])

  setBooks([{
    imageUrl: sample,
    title: "불편한 편의점",
    categories: ["국내도서", "소설/시/희곡"],
    company: "나무 옆 의자" ,
  }])


  return (
    <Container>
      <Title>나혜승 님의 취향 가득 추천 도서</Title>
      <List>
        {/* {
          books.forEach((book, idx) => {
            console.log(book, idx)
          })
        } */}
        <Book>
          <BookImage></BookImage>
          <BookTitle>불편한 편의점</BookTitle>
          <Categories>
            <Category>
              <div>국내도서</div>
            </Category>
            <Category>
              <div>소설/시/희곡</div>
            </Category>
          </Categories>
          <Company>나무 옆 의자</Company>
        </Book>
      </List>
    </Container>
  );
}
