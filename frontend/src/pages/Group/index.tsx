import React, { useState } from "react";
import GroupCover from "../../Components/Contents/GroupCover";
import styled from "styled-components";
import sample from "../../Assets/Images/sample.png";
import Nav from "../../Components/Common/Nav";

interface BookGroup {
  writer: string;
  imageUrl: string;
  title: string;
  author: string;
  participant: number;
}

export default function Group() {
  // const [bookGroups, setBookGroups] = useState<BookGroup[]>([])
  let title: string = "불편한 편의점";
  let author: string = "김호연";
  let participant: number = 3;

  return (
    <Container>
      <Nav />
      <Text>참여중인 독서 모임</Text>
      <BookGroupCards>
        <GroupCover
          imageUrl={sample}
          title={title}
          author={author}
          participant={participant}
        />
        <GroupCover
          imageUrl={sample}
          title={title}
          author={author}
          participant={participant}
        />
      </BookGroupCards>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  background-color: #f5eede;
  width: 100vw;
  height: 100vh;
`;

const BookGroupCards = styled.div`
  display: flex;
  overflow-x: scroll;
  min-height: 190px;
  padding-left: 3%;
`;

const Text = styled.div`
  // 상우하좌
  margin: 20px 0px 15px 20px;
  color: #5c5649;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-size: 1.1rem;
  font-weight: 600;
`;
