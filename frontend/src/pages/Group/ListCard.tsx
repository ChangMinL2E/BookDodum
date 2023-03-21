import React from "react";
import styled from "styled-components";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  writer?: string;
  context?: string;
  chatCnt?: number;
  bookImg: string;
  profileImg?: string;
  id?: number;
}

export default function ListCard(group: Props) {
  const navigate = useNavigate();

  const goGroup = () => {
    navigate(`/bookgroup/${group.id}`);
  };

  return (
    <Div onClick={() => {goGroup()}}>
      <Container>
        <Text>
          <Title>{group.title}</Title>
          <Context>{group.context}</Context>
          <BottomDiv>
            <WriterDiv>
              <ProfileImg src={group.profileImg} />
              <Writer>{group.writer}</Writer>
            </WriterDiv>
            <ChatCnt>
              <ChatBubbleBottomCenterTextIcon width="15px" />
              {group.chatCnt}
            </ChatCnt>
          </BottomDiv>
        </Text>
        <BookImg src={group.bookImg} />
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
