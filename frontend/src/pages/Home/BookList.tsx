import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSelectorTyped from "../../Store";
// Components
import Book from "../../Components/Contents/Book";
// Types
import {BookInfo} from '../../Store/Types'
// APIs
import { getUserRecommendAPI } from "../../apis/recommend";

interface Props {
  type : string;
}

// 컴포넌트 정의
export default function BookList({type} : Props) {
  const nickname = useSelectorTyped((state) => state.user.name);
  const [books, setBooks] = useState<BookInfo[]>([])

  useEffect(() => {
    if (type === 'user') {
      getUserRecommend()
    } else if(type=== 'contents') {
      getContentsRecommend()
    }
  }, [])

  // 협업 필터링 기반
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
        isbn: book.isbn,
      })
    })
    setBooks(tmp)
  }

  // 컨텐츠 기반 
  const getContentsRecommend = async () => {

  }

  return (
    <Container>
      {
        type === 'user' ? <Title>{nickname}님의 취향 가득 추천 도서</Title> : <Title>{nickname}님의 취향 가득 추천 도서</Title>
      }
      <List>
        <>
          {
            books.map((book) => {
              console.log(book)
              return (
                <Book key={book.bookId} book={{
                  imageUrl: book.imageUrl,
                  title: book.title,
                  category: book.category,
                  publisher: book.publisher,
                  isbn: book.isbn,
                }} />
              )
            })
          }
        </>
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