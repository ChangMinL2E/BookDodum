import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRightCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
// Components
import BookBanner from "../../Components/Contents/BookBanner";
import UserList from "../../Components/Contents/UserList";
import MeetingList from "../../Components/Contents/MeetingList";
import NavBack from "../../Components/Contents/NavBack";

export default function Mybook() {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location?.state?.image;
  const title = location?.state?.title;
  const bookId = location?.state?.id;

  const [disable, setDisable] = useState<boolean>(false);
  const handleChnage = () => setDisable(true);

  return (
    <Container>
      <NavBack text={title} link="/mypage" name="mypage" />
      <BookBanner imageUrl={image} />
      <UserList />
      <MeetingList />
      <Writng>
        <WriteIcon>
          <PencilIcon />
        </WriteIcon>
        <WritingText
          onClick={() => {
            navigate(`/write/${bookId}`);
          }}
        >
          독후감 확인하기
        </WritingText>
      </Writng>
      <Recommend>
        <RecommendText> 이 책을 읽은 다른사람이 선택한 책</RecommendText>
        <Icon>
          <ArrowRightCircleIcon />
        </Icon>
      </Recommend>

      <Button disabled={disable} onClick={handleChnage}>
        다 읽었어요!
      </Button>
    </Container>
  );
}

const Container = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
`;

const RecommendText = styled.div`
  margin: 10% 3% 10% 5%;
  color: #4a6eec;
`;
const Recommend = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icon = styled.div`
  width: 25px;
  color: #4a6eec;
  margin-top: 10%;
`;
const Button = styled.button`
  width: 300px;
  height: 50px;
  color: #5c5649;
  background-color: #dbd4c3;
  margin: auto;
  border-color: transparent;

  &:disabled {
    opacity: 0.5;
  }
`;

const Writng = styled.div`
  display: flex;
  color: #5c5649;
  margin: 5%;
`;

const WriteIcon = styled.div`
  width: 15px;
  height: 15px;
`;
const WritingText = styled.div`
  color: #5c5649;
`;
