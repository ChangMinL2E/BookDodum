import React from 'react';
import UserProfile from './UserProfile';
import profile from '../../Assets/Images/profile.png'
import styled from 'styled-components';


export default function UserList() {
    return (
        <Container>
        <UserText>현재 이 책을 읽고 있는 사람  · 14명 </UserText>
        <List>
          <UserProfile imageUrl={profile} username={'혜씌'}/>
          <UserProfile imageUrl={profile} username={'유나크'}/>
          <UserProfile imageUrl={profile} username={'독서왕'}/>
        </List>
        </Container>
    );
}

const Container = styled.div`
    width: 90%;
    margin: 5% auto;
`
const List = styled.div`
    width: 100%;
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

const UserText = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #5C5649;
`