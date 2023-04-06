import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListCard from "./ListCard";
import Button from "./Button";
import { getBooksAPI, getBookMeetingAPI } from "../../apis/meeting";
import { MeetingInfo, UserBook } from "../../Store/Types";

export default function List() {
  const [bookMeetings, setBookMeetings] = useState<MeetingInfo[]>([]);
  const [bookIds, setBookIds] = useState<number[]>([]);

  const getBooks = async () => {
    const data = await getBooksAPI();
    let list: number[] = [];
    data?.forEach((item: UserBook) => {
      list.push(item.bookId);
    });
    setBookIds(list);
  };

  const getBookMeeting = async (bookid: number) => {
    const data = await getBookMeetingAPI(bookid);
    let list: MeetingInfo[] = [];
    data?.forEach((item: MeetingInfo) => {
      list.push({
        commentCnt: item.commentCnt,
        content: item.content,
        imageUrl: item.imageUrl,
        title: item.title,
        leaderUserName: item.leaderUserName,
        leaderUserId: item.leaderUserId,
        meetingId: item.meetingId,
      });
    });
    setBookMeetings([...bookMeetings, ...list]);
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (bookIds.length > 0) {
      bookIds.map((bookid) => getBookMeeting(bookid));
    }
  }, [bookIds]);

  return (
    <ListBack>
      <TopDiv>
        <ListText>모임</ListText>
        <Button />
      </TopDiv>
      <>
        {bookMeetings?.map((bookMeeting: MeetingInfo, idx) => (
          <ListCard key={idx} {...bookMeeting} />
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
