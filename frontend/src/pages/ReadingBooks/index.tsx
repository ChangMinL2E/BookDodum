import React from "react";
import BookBanner from "../../Components/Contents/BookBanner";
import UserList from "../../Components/Contents/UserList";
import styled from "styled-components";
import MeetingList from "../../Components/Contents/MeetingList";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function Mybook() {
  return (
    <Container>
      <BookBanner />
      <UserList />
      <MeetingList />
      <Recommend>
        <RecommendText> 이 책을 읽은 다른사람이 선택한 책</RecommendText>
        <Icon>
          <ArrowRightCircleIcon/>
        </Icon>
      </Recommend>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecommendText = styled.div`
  margin: 10% 3% 10% 5%;
  color: #4a6eec;
`;
const Recommend = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icon = styled.div`
  width: 25px;
  color: #4a6eec;
  margin-top: 10%;
`;
