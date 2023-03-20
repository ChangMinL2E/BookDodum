import React from "react";
import styled from "styled-components";

interface Props {
  imageUrl?: string;
  title?: string;
  author?: string;
  participant?: number;
}

export default function GroupCover(groupData: Props) {
  return (
    <GroupImage imageUrl={groupData.imageUrl}>
      <WhiteDiv>
        <Title>{groupData.title}</Title>
        <Author>{groupData.author}</Author>
        <Participant>{groupData.participant}명 참여중</Participant>
      </WhiteDiv>
    </GroupImage>
  );
}

// styled component
const GroupImage = styled.div<Props>`
  background-image: url(${(props: Props) => props.imageUrl});
  min-width: 190px;
  height: 150px;
  background-size: cover;
  filter: drop-shadow(2px 5px 4px rgba(0, 0, 0, 0.25));
  border-radius: 3px;
  margin: 5px;
`;

const WhiteDiv = styled.div`
  width: 190px;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0px 0px 3px 3px;
  bottom: 0;
  position: absolute;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin: 10px 5px 0px 10px;
`;

const Author = styled.div`
  font-size: 0.9rem;
  color: #5c5649;
  margin: 0px 5px 0px 10px;
`;

const Participant = styled.div`
  color: #5c5649;
  font-size: 0.8rem;
  text-align: right;
  margin-right: 5px;
`;
