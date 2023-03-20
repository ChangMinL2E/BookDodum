import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  title: string,
};

export default function Check(bookData: Props) {
  let title = bookData.title;
  
  return (
    <Background>
      <BookCheck>
        <Title>'{title}'이 맞습니까?</Title>
        <Nobtn>아니에요</Nobtn>
        <Yesbtn>맞아요</Yesbtn>
      </BookCheck>
    </Background>
  );
}

// styled component
const Background = styled.div`
  background-color: #5c5649;
  width: 100vw;
  height: 100vh;
`;

const BookCheck = styled.div`
  width: 80%;
  height: 30%;
  background-color: #f7f3eb;
  position: fixed;
  top: 30%;
  left: 9%;
  border-radius: 5px;
`;

const Title = styled.div`
  color: #5c5649;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
`;

const Nobtn = styled.button`
  background-color: #ebe4d3;
  width: 100px;
  height: 40px;
  text-align: center;
  color: #5c5649;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: 0px;
  font-weight: 600;
`;

const Yesbtn = styled.button`
  background-color: #8f8876;
  width: 100px;
  height: 40px;
  text-align: center;
  color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: 0px;
  font-weight: 600;
`;