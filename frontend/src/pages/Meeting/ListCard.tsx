import React from "react";
import styled from "styled-components";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import profile from "../../Assets/Images/profile.png";
import { MeetingInfo } from "../../Store/Types";

export default function ListCard(props: MeetingInfo) {
  const navigate = useNavigate();

  return (
    <Div
      onClick={() => {
        navigate(`/bookmeeting/${props.meetingId}`, {
          state: {
            title: props.title,
            leaderUserName: props.leaderUserName,
            content: props.content,
          },
        });
      }}
    >
      <Container>
        <Text>
          <Title>
            {props.title.length > 15
              ? props.title?.slice(0, 15) + "..."
              : props.title}
          </Title>
          <Context>{props.content}</Context>
          <BottomDiv>
            <WriterDiv>
              <ProfileImg src={profile} />
              <Writer>{props.leaderUserName}</Writer>
            </WriterDiv>
            <ChatCnt>
              <ChatBubbleBottomCenterTextIcon width="15px" />
              {props.commentCnt}
            </ChatCnt>
          </BottomDiv>
        </Text>
        <BookImg src={props.imageUrl} />
      </Container>
      <Line />
    </Div>
  );
}

const Div = styled.div`
  margin-bottom: 5%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2% 2% 0 2%;
`;

const Text = styled.div`
  margin: 2.5%;
`;

const Title = styled.div`
  color: #5c5649;
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

const Context = styled.div`
  font-size: 0.7rem;
  min-height: 60px;
  // 수정?
  min-width: 210px;
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 6% 2% 0 0;
`;

const WriterDiv = styled.div`
  vertical-align: middle;
`;

const Writer = styled.div`
  color: #5c5649;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-block;
`;

const ProfileImg = styled.img`
  border-radius: 100px;
  width: 25px;
  height: 25px;
  float: left;
  margin-right: 5px;
`;

const BookImg = styled.img`
  min-width: 90px;
  height: 140px;
`;

const ChatCnt = styled.div`
  padding: 5px 0px;
  font-size: 0.5rem;
`;

const Line = styled.div`
  border-bottom: 1px solid #5c5649;
  opacity: 0.3;
  padding-top: 2%;
  margin: 0 3% 0 3%;
`;
