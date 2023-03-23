import React, { useState } from "react";
import MeetingCover from "../../Components/Contents/MeetingCover";
import styled from "styled-components";
import sample from "../../Assets/Images/sample.png";
import Nav from "../../Components/Common/Nav";
import { useNavigate } from "react-router-dom";
import List from "./List";

interface BookMeeting {
  id: number;
  writer: string;
  imageUrl: string;
  title: string;
  author: string;
  participant: number;
}

export default function Meeting() {
  // const [bookGroups, setBookGroups] = useState<BookGroup[]>([])
  let title: string = "불편한 편의점";
  let author: string = "김호연";
  let participant: number = 3;
  let id: number = 1;

  return (
    <Container>
      <Nav />
        <Text>참여중인 독서 모임</Text>
      <BookMeetingCards>
        <MeetingCover
          imageUrl={sample}
          title={title}
          author={author}
          participant={participant}
          id={id}
        />
        <MeetingCover
          imageUrl={sample}
          title={title}
          author={author}
          participant={participant}
          id={2}
        />
      </BookMeetingCards>
      <List />
    </Container>
  );
}

// Styled Component
const Container = styled.div`
  background-color: #f5eede;
  width: 100vw;
  height: 100vh;
`;

const BookMeetingCards = styled.div`
  display: flex;
  overflow-x: scroll;
  min-height: 190px;
  padding-left: 3%;
`;

const Text = styled.div`
  font-family: "Gowun Batang", serif;
  // 상우하좌
  margin: 20px 0px 15px 20px;
  color: #5c5649;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-size: 1.1rem;
  font-weight: 600;
`;
