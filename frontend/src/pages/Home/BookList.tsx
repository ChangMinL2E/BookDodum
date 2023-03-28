import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sample from "../../Assets/Images/sample.png";
import Book from "../../Components/Contents/Book";
import useSelectorTyped from "../../Store";


// 컴포넌트 정의
export default function BookList() {
  const nickname = useSelectorTyped((state) => state.user.name);
  // const [books , setBooks] = useState<Book[]>([])

  useEffect(() => {
   
  })

  return (
    <Container>
      <Title>{nickname}님의 취향 가득 추천 도서</Title>
      <List>
        <Book book={{
          imageUrl: sample,
          title: "불편한 편의점",
          categories: [],
          publisher: "나무 옆 의자",
          ISBN : 0,
        }} />
      </List>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 5% auto;
  `
const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
     color: #5c5649;
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