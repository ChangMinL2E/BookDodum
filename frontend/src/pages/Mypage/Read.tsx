import React, { useEffect, useState } from "react";
import BookCover from "../../Components/Contents/BookCover";
import styled from "styled-components";
import ImageAI from "../../Components/Contents/ImageAI";
import Select from "../../Assets/Images/oilpainting.png";
import useSelectorTyped from "../../Store";
import { getReadBooksAPI } from "../../apis/read";
import { useNavigate } from "react-router-dom";

const Read: React.FC = () => {
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
    getReadingAPI();
  }, []);

  const getReadingAPI = async () => {
    const data = await getReadBooksAPI();
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
            <ImageAI name={"img"} imageUrl={Select} size={"90px"} />
          </BookItem>
        ))}
      </BooksWrap>
    </Container>
  );
};

const Container = styled.div`
  background-color: #5c5649;
  height: 100vh;
`;

const ReadText = styled.div`
  color: #f9f9f7;
  padding-top: 3%;
  margin-left: 5%;
  size: 13px;
`;

const List = styled.div``;

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

export default Read;
