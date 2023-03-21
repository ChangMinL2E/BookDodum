import React from "react";
import styled from "styled-components";
// UserProfile 타입

interface UserProps {
  imageUrl: string;
  username: string;
}

export default function UserProfile({ imageUrl, username }: UserProps) {
  return (
      <UserWrapper>
        <ImageBox>
          <UserImage imageUrl={imageUrl} username={username} />
        </ImageBox>
        <UserName> {username}</UserName>
      </UserWrapper>
  );
}

const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin:3% ;
`;

const ImageBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 70%;
`;

const UserImage = styled.div<UserProps>`
  width: 100%;
  height: 100%;
  border-radius: 70%;
  background-size: cover;
  background-image: url(${(props: UserProps) => `${props.imageUrl}`});
`;
const UserName = styled.div``;


const List = styled.div`
  display: flex;
  overflow-x: scroll;
   &::-webkit-scrollbar {
      display: none;
    }

`;