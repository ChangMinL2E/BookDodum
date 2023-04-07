import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MeetingCover from "../../Components/Contents/MeetingCover";
import styled from "styled-components";
import { UsersIcon } from "@heroicons/react/24/outline";
import { getBookMeetingAPI } from "../../apis/meeting";
import { MeetingInfo } from "../../Store/Types";

export default function MeetingList() {
  const bookid: number = Number(useParams().bookid);
  const [bookMeetings, setBookMeetings] = useState<MeetingInfo[]>([]);

  const getBookMeeting = async () => {
    const data = await getBookMeetingAPI(bookid);
    let list: MeetingInfo[] = [];
    data?.forEach((item: MeetingInfo) => {
      list.push({
        meetingId: item.meetingId,
        title: item.title,
        content: item.content,
        leaderUserName: item.leaderUserName,
        leaderUserId: item.leaderUserId,
        commentCnt: item.commentCnt,
        imageUrl: item.imageUrl,
      });
    });
    setBookMeetings(list);
  };

  useEffect(() => {
    getBookMeeting();
  }, []);

  return (
    <Container>
      <MeetingText>
        <UsersIcon width={22} style={{ margin: "0 1% 0 0" }} />
        <div>진행 중인 독서모임 </div>
      </MeetingText>
      <Contents>
        {bookMeetings.length === 0 ? (
          <div style={{ fontSize: "13px", width: "100%", textAlign:'center'}}>아직 없어요😥</div>
        ) : (
          <List>
            <>
              {bookMeetings?.map((bookMeeting) => (
                <MeetingCover key={bookMeeting.meetingId} {...bookMeeting} />
              ))}
            </>
          </List>
        )}
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  min-height: 100px;
  margin: 1% 0;
`;

const MeetingText = styled.div`
  width: 100%;
  font-weight: 600;
  color: #5c5649;
  display: flex;
  align-items: center;
`;

const List = styled.div`
  display: flex;
  overflow-x: scroll;
  padding-left: 3%;
`;
