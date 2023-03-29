import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sample from "../../Assets/Images/sample.png";
import Book from "../../Components/Contents/Book";
import useSelectorTyped from "../../Store";
import { getUserRecommendAPI } from "../../apis/recommend";

interface BookInfo {
  bookId: number;
  imageUrl: string;
  publisher: string;
  title: string;
  category: string[];
}


// 컴포넌트 정의
export default function BookList() {
  const nickname = useSelectorTyped((state) => state.user.name);
  const [books , setBooks] = useState<BookInfo[]>([])


  const type = 1

  useEffect(() => {
    if (type === 1) {
      getUserRecommend()
    }
  }, [])

  const getUserRecommend = async () => {
    const data = await getUserRecommendAPI(3);

    let tmp: BookInfo[] = []
    data.forEach((book: BookInfo) => {
      tmp.push({
        title: book.title,
        imageUrl: book.imageUrl,
        publisher: book.publisher,
        category: book.category,
        bookId: book.bookId,
      })
    })
    console.log(tmp)
    setBooks(tmp)
  }
  return (
    <Container>
      <Title>{nickname}님의 취향 가득 추천 도서</Title>
      <List>
        <Book book={{
          imageUrl: sample,
          title: "불편한 편의점",
          category: [],
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