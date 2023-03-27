import React, { useEffect, useState } from "react";
import styled, { ThemeProps } from "styled-components";
import sample from "../../Assets/Images/sample.png";
import BookCover from "../../Components/Contents/BookCover";
import { PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";
import { getReadingBooksAPI } from "../../apis/reading";
import { getRegionCodeAPI } from "../../apis/region";
import useSelectorTyped from "../../Store";

interface ReadingBook {
  bookId: number;
  category: string[];
  imageUrl: string;
  publisher: string;
  title: string
}

interface Props {
  theme: string;
}

// 컴포넌트 정의
export default function ReadingBooks({ theme }: Props) {
  const nickname = useSelectorTyped((state) => state.user.name);
  const navigate = useNavigate();
  const [books, setBooks] = useState<ReadingBook[]>([]);

  const handleClickReading = () => {
    navigate('/reading')
  }

  useEffect(() => {
    // 읽고 있는 책 목록 조회
    getReadingBooks()
  }, [])

  const getReadingBooks = async () => {
    const data = await getReadingBooksAPI()

    let tmp: ReadingBook[] = []
    data.forEach((book: any) => {
      tmp.push({
        bookId: book.bookId,
        category: book.category,
        imageUrl: book.imageUrl,
        publisher: book.publisher,
        title: book.title,
      })
    })

    setBooks(tmp)
  }

  return (
    <Container>
      <Title theme={theme}>{nickname}님이 읽고 있는 책</Title>
      <List>
        <AddBtn theme={theme} onClick={() => navigate('/isbn')}><PlusIcon width="40px" strokeWidth="0.7px" color={theme==='dark'? '#F9F9F7': '#5c5649'} /></AddBtn>
        <>{
          books?.map((book) => {
            return (
              <div onClick={handleClickReading} key={book.bookId}>
                <BookCover imageUrl={book.imageUrl} size={120} />
              </div>
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
    margin: 5% auto 10% auto;
  `
const Title = styled.div<Props>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props: Props) => props.theme === 'dark' ? '#F9F9F7' : '#5c5649'};
    width: 90%;
    margin: 5% auto;
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

