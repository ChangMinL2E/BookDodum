import React from "react";
import MeetingCover from "../../Components/Contents/MeetingCover";
import sample from "../../Assets/Images/sample.png";
import styled from "styled-components";
import { UsersIcon } from "@heroicons/react/24/outline";

export default function MeetingList() {
  let title: string = "불편한 편의점";
  let author: string = "김호연";
  let participant: number = 3;
  let id: number = 1;
  return (
    <Container>
      <MeetingText>
        <UsersIcon width={22} /> 진행 중인 독서모임{" "}
      </MeetingText>
      <List>
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
          id={id}
        />
        <MeetingCover
          imageUrl={sample}
          title={title}
          author={author}
          participant={participant}
          id={id}
        />
      </List>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeetingText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #5c5649;
  margin: 3%;
`;

const List = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-left: 3%;
`;
