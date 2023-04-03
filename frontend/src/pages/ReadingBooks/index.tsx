import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowRightCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
// Components
import BookBanner from "../../Components/Contents/BookBanner";
import UserList from "./UserList";
import MeetingList from "./MeetingList";
import NavBack from "../../Components/Contents/NavBack";
import ImageAI from "../../Components/Contents/ImageAI";
import { getUserRecommendAPI } from "../../apis/recommend";
// Type
import { BookInfo } from "../../Store/Types";

export default function Mybook() {
  const navigate = useNavigate();
  const location = useLocation();
  const image = location?.state?.image;
  const title = location?.state?.title;
  const converted = location?.state?.converted
  const bookId = useParams().bookid
  
  const handleChange = () => {
    navigate("/isbn", { state: { type: false } });
  };

  const handleClickRecommend = () => {
    getUserRecommend()
  }

  const getUserRecommend = async () => {
    if(bookId !== undefined) {

      const data = await getUserRecommendAPI(Number(bookId));
      
      let tmp: BookInfo[] = []
    data.forEach((book: BookInfo) => {
      tmp.push({
        title: book.title,
        imageUrl: book.imageUrl,
        publisher: book.publisher,
        category: book.category,
        bookId: book.bookId,
        isbn: book.isbn,
      })
    })
    navigate('/list', {state : {books: tmp}})
  }
  }

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
        <RecommendText onClick={handleClickRecommend}>이 책을 읽은 다른사람이 선택한 책</RecommendText>
        <Icon>
          <ArrowRightCircleIcon />
        </Icon>
      </Recommend>
      {!converted &&  <Button onClick={handleChange}>
        다 읽었어요!
      </Button> }
      <ImgeContainer>
      {converted  && <ImageAI imageUrl={converted} size= "200px"/> }
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
`

const Writing = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  color: #5c5649;
  margin: auto;
`

const WriteIcon = styled.div`
  width: 17px;
  height: 17px;
  display: flex;
  justify-content: center;
  margin : 0 1% 0 0;
`

const WritingText = styled.div`
  color: #5c5649;
`

const ImgeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8%;

`