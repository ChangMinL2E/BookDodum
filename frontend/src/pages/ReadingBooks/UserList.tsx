import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import profile from "../../Assets/Images/profile.png";
import styled from "styled-components";
import { User } from "../../Store/Types";
// APIs
import { getReadWithAPI } from "../../apis/readwith";

interface Props {
  bookId: number;
}

export default function UserList({ bookId }: Props) {
  const [users, setUsers] = useState<User[]>([]);

  const getReadWith = async () => {
    const data = await getReadWithAPI(bookId);

    let tmp: User[] = [];
    data?.forEach((user: any) => {
      tmp.push({
        nickname: user.name,
      });
    });

    setUsers(tmp);
  };

  useEffect(() => {
    getReadWith();
  }, []);

  return (
    <Container>
      <UserText>현재 이 책을 읽고 있는 사람 · {users?.length}명 </UserText>
      <Contents>
        {users.length === 0 ? (
          <div style={{ fontSize: "13px" }}>아직 없어요😥</div>
        ) : (
          <List>
            <>
              {users?.map((user) => {
                return (
                  <UserProfile key={user.nickname} nickname={user.nickname} />
                );
              })}
            </>
          </List>
        )}
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  margin: 5% auto 2% auto;
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80px;
  margin: 1% 0;
`;

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
  color: #5c5649;
`;
