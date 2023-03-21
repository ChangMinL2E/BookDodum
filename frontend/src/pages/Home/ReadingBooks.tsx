import React, { useEffect, useState } from "react";
import styled from "styled-components";
import sample from "../../Assets/Images/sample.png";
import BookCover from "../../Components/Contents/BookCover";
import { PlusIcon } from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";

// 컴포넌트 정의
export default function ReadingBooks() {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Title>나혜승님이 읽고 있는 책</Title>
      <List>
        <AddBtn onClick={() => navigate('/isbn')}><PlusIcon width="40px" strokeWidth="0.7px" color="#5c5649"/></AddBtn>
        <BookCover imageUrl={sample} size={120} />
        <BookCover imageUrl={sample} size={120} />
        <BookCover imageUrl={sample} size={120} />
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
const Title = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #5c5649;
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
    border: 1px dashed #5c5649;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5%;
  `

