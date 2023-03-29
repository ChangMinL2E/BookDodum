import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Nav from '../../Components/Common/Nav';
import Book from '../../Components/Contents/Book'
import sample from '../../Assets/Images/sample.png'
import { useLocation } from 'react-router-dom';
import { getUserRecommendAPI } from '../../apis/recommend';


interface BookInfo {
  bookId: number;
  imageUrl: string;
  publisher: string;
  title: string;
  category: string[];
}


export default function RecommendList() {

  const [books, setBooks] = useState<BookInfo[]>([])
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
    <>
      <Nav />
      <Contents>
        { type === 1 ? 
        <Title>"{}을 읽은 사람이 선택한 도서"</Title>
        : <Title>"김유나 님이 관심있는 분야의 도서"</Title>
      }
        <BooksWrap>
          <>
            {
              books.map((book) => {
                return (
                  <Book key={book.bookId} book={{
                    imageUrl: book.imageUrl,
                    title: book.title,
                    category: book.category,
                    publisher: book.publisher,
                    ISBN: 0,
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

