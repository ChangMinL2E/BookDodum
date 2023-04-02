import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useSelectorTyped from '../../Store';
// Components
import Nav from '../../Components/Common/Nav';
import Book from '../../Components/Contents/Book'
// Types
import { useLocation } from 'react-router';


export default function RecommendList() {
  const location = useLocation()
  const books = location.state.books
  const type = location.state.type
  const nickname = useSelectorTyped((state) => state.user.name);

  return (
    <>
      <Nav />
      <Contents>
        { type === 1 ? 
        <Title>"{nickname}님을 위한 북돋움의 추천 도서"</Title>
        : <Title>"{}을 읽은 사람이 선택한 도서"</Title>
      }
        <BooksWrap>
          <>
            {
              books.map((book: any) => {
                return (
                  <Book key={book.id} book={{
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
        </BooksWrap>
      </Contents>
    </>
  );
}

const Contents = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding-top:5%                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #5c5649;
  text-align: center;
  margin: 2% 0 3% 0;
`

const BooksWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 4%;
  width: 95%;
  margin:auto;
  justify-content: center;
`

