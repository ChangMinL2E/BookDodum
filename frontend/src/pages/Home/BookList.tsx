import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sample from "../../Assets/Images/sample.png";
import Book from "../../Components/Contents/Book";

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



// 타입선언
// type book = {
//   imageUrl : String;
//   title : String;
//   categories : String[];
//   company : String;
// }

// 컴포넌트 정의
export default function BookList() {
  // const [books , setBooks] = useState<Book[]>([])

  useEffect(() => {

    // setBooks([{
    //     imageUrl: sample,
    //     title: "불편한 편의점",
    //     categories: ["국내도서", "소설/시/희곡"],
    //     company: "나무 옆 의자" ,
    //   },])
    })

  return (
    <Container>
      <Title>나혜승 님의 취향 가득 추천 도서</Title>
      <List>
      <Book book={{imageUrl: sample,
        title: "불편한 편의점",
        categories: ["국내도서", "소설/시/희곡"],
        company: "나무 옆 의자"}}/>
      </List>
    </Container>
  );
}