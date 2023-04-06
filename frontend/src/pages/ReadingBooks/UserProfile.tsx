import React from "react";
import styled from "styled-components";
import profile from '../../Assets/Images/profile.png'
// UserProfile 타입
import { User } from "../../Store/Types";

export default function UserProfile({ nickname }: User) {
  return (
      <UserWrapper>
        <ImageBox>
          <UserImage/>
        </ImageBox>
        <UserName>{nickname}</UserName>
      </UserWrapper>
  );
}

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3% 2%;
`;

const ImageBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 35px;
`;

const UserImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 35px;
  background-size: cover;
  background-image: url(${profile});
`;

const UserName = styled.div`
  font-size: 10px;
  margin: auto;
`;
