import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListCard from "./ListCard";
import Button from "./Button";
import { getMeetingJoinAPI } from "../../apis/meeting";

interface BookMeeting {
  commentCnt: number;
  content: string;
  imageUrl: string;
  title: string;
  userName: string;
  id: number;
}

export default function List() {
  const [bookMeetings, setBookMeetings] = useState<BookMeeting[]>([]);

  const getMeetingJoin = async () => {
    const data = await getMeetingJoinAPI();
    let list: BookMeeting[] = [];
    data.forEach((item: BookMeeting) => {
      list.push({
        commentCnt: item.commentCnt,
        content: item.content,
        imageUrl: item.imageUrl,
        title: item.title,
        userName: item.userName,
        id: item.id
      });
    });
    setBookMeetings(list);
  };

  useEffect(() => {
    getMeetingJoin();
  }, []);

  return (
    <ListBack>
      <TopDiv>
        <ListText>모임</ListText>
        <Button />
      </TopDiv>
      <>
        {bookMeetings.map((bookMeeting: BookMeeting, idx) => (
          <ListCard key={idx} {...bookMeeting}/>
        ))}
      </>
    </ListBack>
  );
}

const ListBack = styled.div`
  min-height: 56%;
  padding: 5px;
  bottom: 0;
  background-color: #f7f3eb;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListText = styled.div`
  font-family: "Gowun Batang", serif;

  color: #5c5649;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-size: 1.3rem;
  text-decoration: underline;
  margin: 15px 0px 15px 20px;
`;
