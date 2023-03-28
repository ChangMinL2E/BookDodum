import React from "react";
import { useParams } from "react-router-dom";
import MeetingCover from "../../Components/Contents/MeetingCover";
import sample from "../../Assets/Images/sample.png";
import styled from "styled-components";
import { UsersIcon } from "@heroicons/react/24/outline";
import { getBookMeetingAPI } from "../../apis/meeting";

interface Info {
  id: number;
  title: string;
  content: string;
  userName: string;
  commentCnt: number;
  imageUrl: string;
}

export default function MeetingList() {
// const bookid: number = Number(useParams().meetid);
  const bookid: number = 1;

  const getBookMeeting = async () => {
    const data = await getBookMeetingAPI(bookid);
    let list: Info[] = [];
    data.forEach((item: Info) => {
      list.push({
        id: item.id,
        title: item.title,
        content: item.content,
        userName: item.userName,
        commentCnt: item.commentCnt,
        imageUrl: item.imageUrl,
      })
    })
  }

  return (
    <Container>
      <MeetingText>
        <UsersIcon width={22} /> 진행 중인 독서모임{" "}
      </MeetingText>
      <List>
        {/* <MeetingCover
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
        /> */}
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
