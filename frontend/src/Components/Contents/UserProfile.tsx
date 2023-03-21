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
        <UserImage>{imageUrl}</UserImage>
      </ImageBox>
      <UserName> {username}</UserName>
    </UserWrapper>
  );
}

const UserWrapper = styled.div`
  display: flex;
`;

const ImageBox = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 70%;
  /* overflow: hidden; */
  border: solid 2px red;
`;
const UserImage = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const UserName = styled.div``;
