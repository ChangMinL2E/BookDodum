import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { writeTextAPI } from "../../apis/write";
import { useParams } from "react-router-dom";
import { getWriteAPI, deleteCommentAPI } from "../../apis/write";
import Comment from "./Comment";

// 독후감등록 타입 시정
interface Comment {
  bookId: number;
  content: string;
}

// 독후감 리스트 타입 지정
interface CommentItem {
  reviewId: number;
  content: string;
}

export default function TextForm() {
  const bookId: number = Number(useParams().bookid);
  const [content, setContent] = useState<string>("");
  const [comments, setComments] = useState<CommentItem[]>([]);

  //둑후감은 Comment라는 타입을 사용한다는 뜻,
  const comment: Comment = {
    bookId: bookId,
    content: content,
  };

  // bookId와 text를 한꺼번에 보내기
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const writeText = async () => {
    if (content !== "") {
      await writeTextAPI(comment);
      // 받은 데이터가 리스트일 때 foreach를 써서 넣어주기
      setContent("");
      alert("등록되었습니다. ");
      getWrite();
    } else {
      alert("글을 입력해주세요");
    }
  };

  // 독후감 리스트 불러오는 api 호출
  const getWrite = async () => {
    const data = await getWriteAPI(bookId);
    console.log(data);

    let tmp: CommentItem[] = [];
    data.forEach((item: CommentItem) => {
      tmp.push({
        reviewId: item.reviewId,
        content: item.content,
      });
    });

    setComments(tmp);
  };

  useEffect(() => {
    getWrite();
  }, []);

  return (
    <>
      <Container>
        <Title>여러분의 생각을 남겨보세요.</Title>
        <InputBox>
          <Input
            type="text"
            value={content}
            // placeholder="여기에 글을 작성해주세요."
            onChange={handleTextChange}
          />
          <Button onClick={writeText}>
            <Icon>
              <PaperAirplaneIcon />
            </Icon>
          </Button>
        </InputBox>
        <ContentContainer>
          <FirstBox>
            {comments?.map((content: CommentItem, idx) => {
              if(idx%2 === 0){
                return (
                  <Comment key={content.reviewId} reviewId = {content.reviewId} content={content.content} getWrite={getWrite}/>
                  );
                }
            })}
          </FirstBox>
          <SecondBox>
            {comments?.map((content: CommentItem, idx) => {
             if(idx%2 === 1){
              return (
                <Comment key={content.reviewId} reviewId = {content.reviewId} content={content.content} getWrite={getWrite}/>
                );
              }
            })}
          </SecondBox>
        </ContentContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 90%;
  margin: auto;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
`;

const Title = styled.div`
  color: #5c5649;
  font-weight: bold;
  margin-top: 0.3rem;
`;

const Input = styled.input`
  background-color: transparent;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #5c5649;
  width: 100%;
  height: 2.3rem;
  margin-top: 0.4rem;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
`;

const Icon = styled.div`
  border: #5c5649;
  height: 20px;
  width: 20px;
`;

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const FirstBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const SecondBox = styled.div`
  display: flex;
  flex-direction: column;
`;
