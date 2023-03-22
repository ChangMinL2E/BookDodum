import React, { useState } from "react";
import styled from "styled-components";
import NavBack from "../../Components/Contents/NavBack";
import CommentList from "./CommentList";

export default function WriteText() {
  const [text, setText] = useState<string>("");
  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setText("");
    console.log(text);
  };
  const handleTextChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  return (
    <>
    <NavBack text={'독후감 쓰기'} link= {'/reading'}/>
    <Container>
        
      <Title>여러분의 생각을 남겨보세요.</Title>
      <form onSubmit={handelSubmit}>
        <Input type="text" value={text} placeholder='여기에 글을 작성해주세요.'onChange={handleTextChnage}></Input>
      </form>
      <CommentList/>
    </Container>

    </>
  );

}

const Container = styled.div`
  height: 100vh;
  width: 90%;
  margin: auto;
`;

const Title = styled.div`
  color: #5c5649;
  font-weight: bold;
  margin-top: 0.3rem;
`;

const Input = styled.input`
  width: 100%;
  height: 10vh;
  margin-top: 0.4rem;
`;