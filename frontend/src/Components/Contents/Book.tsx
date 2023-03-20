import { BookmarkSlashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import styled from 'styled-components';
import sample from "../../Assets/Images/sample.png";

// 타입선언
interface Props {
    book: {
        imageUrl: string;
        title: string;
        categories: string[];
        company: string;
    }
}

interface ImageProps {
    imageUrl: string;
}

function Book({book}: Props) {
    return (
        <BookCard>
            <BookImage imageUrl={sample}/>
            <BookTitle>{book?.title}</BookTitle>
            <Categories>
                <Category>
                    국내도서</Category>
                <Category>소설/시/희곡</Category>
            </Categories>
            <Company>{book?.company}</Company>
        </BookCard>
    );
}

export default Book;

const BookCard = styled.div`
  width: 130px;
  margin: auto 5%;
`;

const BookImage = styled.div<ImageProps>`
  width: 130px;
  height: 185px;
  background-image: url(${(props:ImageProps) => props.imageUrl});
  background-size: contain;
  box-shadow: 2px 5px 4px 0px #00000040;
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
  padding: 2% 4%;
  `;

const Company = styled.div`
  font-size: 11px;
  color: #9b9b9b;
  margin-top:4%;
`;
