import React from "react";
import styled from "styled-components";
import profile from "../../Assets/Images/profile.png";
import { CommentInfo } from "../../Store/Types";

export default function ListCard(props: CommentInfo) {
  return (
    <Container
      style={{ backgroundColor: props.commentId % 2 ? "#f7f3eb" : "#F9F9F7" }}
    >
      <ProfileImg src={profile} />
      <TopDiv>
        <Name>{props.userName}</Name>
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
