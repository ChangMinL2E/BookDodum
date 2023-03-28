import React from "react";
import styled from "styled-components";
import NavBack from "../../Components/Contents/NavBack";
import CommentList from "./CommentList";
import TextForm from "./TextForm";

export default function WriteText() {
  return (
    <Container>
      <NavBack text={"독후감 쓰기"} link={"/reading/:bookid"} />
      <TextForm/>
      <CommentList />
    </Container>
  );
}

const Container = styled.div`
  background: #f9f9f7;
  height: 100vh;
  width: 100%;
`;
