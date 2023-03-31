import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSelectorTyped from "../../Store";
import Select from "../../Assets/Images/oilpainting.png";
// Components
import BookCover from "../../Components/Contents/BookCover";
import ImageAI from "../../Components/Contents/ImageAI";
// APIs
import { getReadBooksAPI } from "../../apis/read";

export default function Read() {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  interface Book {
    bookId: number;
    category: [];
    convertedImageUrl?: string;
    imageUrl: string;
    publisher: string;
    title: string;
  }

  useEffect(() => {
    getRead();
  }, []);

  const getRead = async () => {
    const data = await getReadBooksAPI();
    console.log(data)
    let list: Book[] = [];
    data.forEach((item: Book) => {
      list.push({
        bookId: item.bookId,
        category: item.category,
        convertedImageUrl: item.convertedImageUrl,
        imageUrl: item.imageUrl,
        publisher: item.publisher,
        title: item.title,
      });
    });
    setBooks(list);
  };

  const nickname = useSelectorTyped((state) => state.user.name);
  return (
    <Container>
      <ReadText>{nickname}님이 다 읽은 책</ReadText>
      <BooksWrap>
        {books?.map((book: Book) => (
          <BookItem
            key={book.bookId}
            onClick={() =>
              navigate(`/reading/${book.bookId}`, {
                state: {
                  image: book.imageUrl,
                  title: book.title,
                  id: book.bookId,
                },
              })
            }
          >
            <BookCover name={"bookImg"} size={120} imageUrl={book.imageUrl} />
            <ImageAI name={"img"} imageUrl={book.convertedImageUrl} size={"90px"} />
          </BookItem>
        ))}
      </BooksWrap>
    </Container>
  );
};

const Container = styled.div`
  background-color: #5c5649;
  padding-bottom: 10%;
`;

const ReadText = styled.div`
  color: #f9f9f7;
  font-weight: bold;
  margin: 3% auto;
  width: 90%;
  size: 13px;
`;

const BooksWrap = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  align-items: center;
`;

const BookItem = styled.div`
  width: 150px;
  height: 200px;
`;

