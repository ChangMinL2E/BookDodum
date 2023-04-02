import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowRightCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
// Components
import BookBanner from "../../Components/Contents/BookBanner";
import UserList from "../../Components/Contents/UserList";
import MeetingList from "../../Components/Contents/MeetingList";
import NavBack from "../../Components/Contents/NavBack";
import ImageAI from "../../Components/Contents/ImageAI";

export default function Mybook() {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location?.state?.image;
  const title = location?.state?.title;
  // const bookId = location?.state?.id;
  const converted = location?.state?.converted
  const bookId = useParams().bookid

  const [disable, setDisable] = useState<boolean>(false);
  const handleChange = () => {
    setDisable(true);
    navigate("/isbn", { state: { type: false } });
  };

  return (
    <Container>
      <NavBack text={title} link="/mypage" name="mypage" />
      <BookBanner imageUrl={image} />
      <UserList bookId={Number(bookId)}/>
      <MeetingList />
      <Writing>
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
      </Writing>
      <Recommend>
        <RecommendText>이 책을 읽은 다른사람이 선택한 책</RecommendText>
        <Icon>
          <ArrowRightCircleIcon />
        </Icon>
      </Recommend>
      {!converted && !disable && <Button disabled={disable} onClick={handleChange}>
        다 읽었어요!
      </Button> }
      <ImgeContainer>
      {(converted || disable) && <ImageAI imageUrl={converted} size= "200px"/> }
      </ImgeContainer>
      
      
    </Container>
  );
}

// styled component
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const RecommendText = styled.div`
  margin: 7% 3% 5% 5%;
  color: #4a6eec;
`

const Recommend = styled.div`
  display: flex;
  flex-direction: row;
`

const Icon = styled.div`
  width: 25px;
  color: #4a6eec;
  margin-top: 7%;
`

const Button = styled.button`
  width: 300px;
  height: 50px;
  color: #5c5649;
  background-color: #dbd4c3;
  margin: 0 auto 5% auto;
  border-color: transparent;
  &:disabled {
    opacity: 0.5;
  }
`



const Writing = styled.div`
  display: flex;
  color: #5c5649;
  margin: 3%;
`

const WriteIcon = styled.div`
  width: 15px;
  height: 15px;
`

const WritingText = styled.div`
  color: #5c5649;
`

const ImgeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8%;

`