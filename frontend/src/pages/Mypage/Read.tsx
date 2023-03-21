import React from "react";
import BookCover from "../../Components/Contents/BookCover";
import sample from "../../Assets/Images/sample.png";
import styled from "styled-components";
import ImageAI from "../../Components/Contents/ImageAI";
import Select from "../../Assets/Images/oilpainting.png";

const Read: React.FC = () => {
  return (
    <Container>

        <ReadText>나혜싀 님이 읽은 책</ReadText>
        <BooksWrap>

        <BookItem>
          <BookCover name={"bookImg"} size={120} imageUrl={sample} />
          <ImageAI name={"img"} imageUrl={Select} size={"90px"} />
        </BookItem>
        <BookItem>
          <BookCover name={"bookImg"} size={120} imageUrl={sample} />
          <ImageAI name={"img"} imageUrl={Select} size={"90px"} />
        </BookItem>
        <BookItem>
          <BookCover name={"bookImg"} size={120} imageUrl={sample} />
          <ImageAI name={"img"} imageUrl={Select} size={"90px"} />
        </BookItem>
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
  margin:auto;
  grid-template-columns: 1fr 1fr;
`
const BookItem = styled.div`
  width: 150px;
  height: 200px;
  margin: 5% auto;
`;

export default Read;
