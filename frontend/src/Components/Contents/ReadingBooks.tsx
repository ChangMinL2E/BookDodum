import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";
import useSelectorTyped from "../../Store";
// Components
import BookCover from "./BookCover";
// Types
import { BookInfo } from "../../Store/Types";
// APIs
import { getReadingBooksAPI } from "../../apis/reading";
import { getRegionCodeAPI } from "../../apis/region";

interface Props {
  theme: string;
  type: string;
}

// 컴포넌트 정의
export default function ReadingBooks({ theme, type }: Props) {
  const navigate = useNavigate();
  const nickname = useSelectorTyped((state) => state.user.name);
  const [books, setBooks] = useState<BookInfo[]>([]);

  useEffect(() => {
    // 읽고 있는 책 목록 조회
    getReadingBooks()
  }, [])

  const getReadingBooks = async () => {
    const data = await getReadingBooksAPI()

    let tmp: BookInfo[] = []
    data.forEach((book: any) => {
      tmp.push({
        bookId: book.bookId,
        category: book.category,
        imageUrl: book.imageUrl,
        publisher: book.publisher,
        title: book.title,
        isbn: 0
      })
    })
    setBooks(tmp)
  }

  return (
    <Container>
      <Title theme={theme} type={''}>{nickname}님이 읽고 있는 책</Title>
      <List>
        {type !== 'mypage' &&
          <AddBtn theme={theme} type={''} onClick={() => navigate('/isbn')}>
            <PlusIcon width="40px" strokeWidth="0.7px" color={theme === 'dark' ? '#F9F9F7' : '#5c5649'} />
          </AddBtn>
        }
        {
          books?.map((book) => {
            return (
              <div onClick={() => navigate(`/reading/${book.bookId}`, { state: { image: book.imageUrl, title: book.title, bookId: book.bookId } })} key={book.bookId}>
                <BookCover imageUrl={book.imageUrl} size={120} />
              </div>
            )
          })
        }
      </List>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 5% auto 10% auto;
    min-height: 200px;
  `
const Title = styled.div<Props>`
    font-size: 16px;
    font-weight: bold;
    color: ${(props: Props) => props.theme === 'dark' ? '#F9F9F7' : '#5c5649'};
    width: 90%;
    margin: 0 auto 4% auto;
  `;

const List = styled.div`
    width: 90%;
    margin: auto;
    display: flex;
    overflow-x: scroll;
  `;

const AddBtn = styled.div`
    min-width: 120px;
    height: 177.6px;
    border: ${(props: Props) => props.theme === 'dark' ? '1px dashed #F9F9F7' : '1px dashed #5c5649'};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5%;
  `

