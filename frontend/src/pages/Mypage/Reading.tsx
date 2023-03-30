import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getReadBooksAPI } from "../../apis/read";
import useSelectorTyped from "../../Store";
import { useNavigate } from "react-router-dom";
import BookCover from "../../Components/Contents/BookCover";

interface Book {
  bookId: number;
  category: [];
  convertedImageUrl?: string;
  imageUrl: string;
  publisher: string;
  title: string;
}

export default function Reading() {
  const [books, setBooks] = useState<Book[]>([]);
  const nickname = useSelectorTyped((state) => state.user.name);
  const navigate = useNavigate();
  let list: Book[] = [];

  const getReading = async () => {
    const data = await getReadBooksAPI();
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
  useEffect(() => {
    getReading();
  });

  return (
    <>
      <ReadText>{nickname}님이 읽고 있는 책</ReadText>
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
          </BookItem>
        ))}
      </BooksWrap>
    </>
  );
}

const ReadText = styled.div`
  color: #f9f9f7;
  padding-top: 3%;
  margin-left: 5%;
  size: 13px;
`;
const BooksWrap = styled.div`
  display: grid;
  width: 95%;
  margin: auto;
  grid-template-columns: 1fr 1fr;
`;

const BookItem = styled.div`
  width: 150px;
  height: 200px;
  margin: 5% auto;
`;
