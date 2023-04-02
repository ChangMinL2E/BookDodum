import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import profile from '../../Assets/Images/profile.png'
import styled from 'styled-components';
import { User } from '../../Store/Types';
// APIs
import { getReadWithAPI } from '../../apis/readwith';

interface Props {
  bookId: number;
}

export default function UserList({ bookId }: Props) {
  const [users, setUsers] = useState<User[]>([])
  console.log(bookId)

  const getReadWith = async () => {
    const data = await getReadWithAPI(bookId)

    let tmp: User[] = []
    data.forEach((user: any) => {
      tmp.push({
        nickname: user.name
      })
    });

    setUsers(tmp)
  }

  useEffect(() => {
    getReadWith()
  }, [])

  return (
    <Container>
      <UserText>현재 이 책을 읽고 있는 사람  · {users?.length}명 </UserText>
      <List>
        <>
          {
            users?.map((user) => {
              return (
                <UserProfile key={user.nickname} nickname={user.nickname} />
              )
            })
          }
        </>
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
    font-size: 15px;
    font-weight: 600;
    color: #5C5649;
`