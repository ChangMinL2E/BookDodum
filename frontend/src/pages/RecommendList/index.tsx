import React from 'react';
import styled from 'styled-components';
import Nav from '../../Components/Common/Nav';
import Book from '../../Components/Contents/Book'
import sample from '../../Assets/Images/sample.png'

export default function RecommendList() {
  return (
    <>
      <Nav />
      <Contents>
        <Title>"김유나 님이 관심있는 분야의 도서"</Title>
        <BooksWrap>
          <Book book={{
            imageUrl: sample,
            title: "불편한 편의점",
            categories: [],
            company: "나무 옆 의자"
          }} />
          <Book book={{
            imageUrl: sample,
            title: "불편한 편의점",
            categories: [],
            company: "나무 옆 의자"
          }} />
          <Book book={{
            imageUrl: sample,
            title: "불편한 편의점",
            categories: [],
            company: "나무 옆 의자"
          }} />
          <Book book={{
            imageUrl: sample,
            title: "불편한 편의점",
            categories: [],
            company: "나무 옆 의자"
          }} />
           <Book book={{
            imageUrl: sample,
            title: "불편한 편의점",
            categories: [],
            company: "나무 옆 의자"
          }} />
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

