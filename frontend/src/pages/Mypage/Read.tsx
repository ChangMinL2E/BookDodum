import React from "react";
import BookCover from "../../Components/Contents/BookCover";
import sample from "../../Assets/Images/sample.png";
import styled from "styled-components";
import ImageAI from "../../Components/Contents/ImageAI";
import Select from "../../Assets/Images/oilpainting.png";

const Read: React.FC = () => {
  return (
    <Container>
      <List>
        <BookItem>
          <ReadText>나혜싀 님이 읽은 책</ReadText>
          <BookCover size={120} imageUrl={sample} />
          <ImageAI imageUrl={Select} size={"90px"} />
        </BookItem>
      </List>
    </Container>
  );
};

const Container = styled.div`
  background-color: #5c5649;
  height: 100vh;
`;

const ReadText = styled.div`
  color: #f9f9f7;
  size: 13px;
`;

const List = styled.div`
  width: 100%;

  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BookItem = styled.div``


export default Read;
