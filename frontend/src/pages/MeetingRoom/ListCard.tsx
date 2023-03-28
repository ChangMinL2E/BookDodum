import React from "react";
import styled from "styled-components";
import profile from "../../Assets/Images/oilpainting.png";

interface Props {
  commentId: number;
  userId: number;
  leader_content: string | null;
  content: string;
}

export default function ListCard(props: Props) {
  const owner = true;
  return (
    <Container
    style={{ backgroundColor: props.commentId % 2 ? "#f7f3eb" : "#F9F9F7" }}
    >
      <ProfileImg src={profile} />
      <TopDiv>
        <Name>냠냠이</Name>
        {owner ? <Owner>모임지기의 말</Owner> : null}
      </TopDiv>
      <Text>{props.content}</Text>
    </Container>
  );
}

// 짝수 홀수 다르게
const Container = styled.div``;

const ProfileImg = styled.img`
  border-radius: 100px;
  width: 45px;
  height: 45px;
  float: left;
  margin: 5%;
  display: flex;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  padding-top: 3%;
`;

const Name = styled.div`
  color: #9b9b9b;
  font-weight: 600;
`;

const Owner = styled.div`
  color: #9b9b9b;
  font-size: 0.8rem;
  margin: 2%;
`;

const Text = styled.div`
  font-size: 0.8rem;
  display: flex;
  padding: 0 5% 3% 0;
`;
