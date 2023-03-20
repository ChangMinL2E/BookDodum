import React from 'react';
import styled from 'styled-components';
import sample from "../../Assets/Images/sample.png";
import BookCover from './BookCover';
import { Book } from '../../Store/Types'

// 타입선언
interface Props {
  book: Book
}

interface ImageProps {
  imageUrl: string;
}

export default function BookCard({ book }: Props) {
  return (
    <Container>
      <BookCover imageUrl={sample} size={130} />
      <BookTitle>{book?.title}</BookTitle>
      <Categories>
        <Category>
          국내도서</Category>
        <Category>소설/시/희곡</Category>
      </Categories>
      <Company>{book?.company}</Company>
    </Container>
  );
}

const Container = styled.div`
  width: 130px;
  margin: auto 5%;
`;

const BookTitle = styled.div`
  font-size: 14;
  font-weight: bold;
  margin-top: 10%;
`;

const Categories = styled.div`
  display: flex;
 flex-wrap: wrap;
`;

const Category = styled.div`
  border: solid #5c5649 1px;
  border-radius: 20px;
  margin: 3% 2% 1% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  padding: 3% 4%;
  `;

const Company = styled.div`
  font-size: 11px;
  color: #9b9b9b;
  margin-top:4%;
`;
