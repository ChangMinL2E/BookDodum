import React, { useState, useEffect } from "react";
import MeetingCover from "../../Components/Contents/MeetingCover";
import styled from "styled-components";
import Nav from "../../Components/Common/Nav";
import List from "./List";
import { getMeetingJoinAPI } from "../../apis/meeting";
import { MeetingInfo } from "../../Store/Types";

export default function Meeting() {
  const [bookMeetings, setBookMeetings] = useState<MeetingInfo[]>([]);

  const getMeetingJoin = async () => {
    const data = await getMeetingJoinAPI();
    let list: MeetingInfo[] = [];
    data?.forEach((item: MeetingInfo) => {
      list.push({
        meetingId: item.meetingId,
        title: item.title,
        content: item.content,
        leaderUserName: item.leaderUserName,
        leaderUserId: item.leaderUserId,
        imageUrl: item.imageUrl,
        commentCnt: item.commentCnt,
      });
    });
    setBookMeetings(list);
  };

  useEffect(() => {
    getMeetingJoin();
  }, []);

  return (
    <Container>
      <Nav />
      <Text>참여중인 독서 모임</Text>
      <BookMeetingCards>
        {bookMeetings?.map((bookMeeting: MeetingInfo) => (
          <MeetingCover key={bookMeeting.meetingId} {...bookMeeting} />
        ))}
      </BookMeetingCards>
      <List />
    </Container>
  );
}

// Styled Component
const Container = styled.div`
  background-color: #f5eede;
  width: 100%;
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
