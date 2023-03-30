import React from "react";
import Read from "./Read";
import MypageBanner from "./MypageBanner";
import styled from "styled-components";
import ReadingBooks from "../../Components/Contents/ReadingBooks";

export default function Mypage() {
  return (
    <Container>
      <MypageBanner />
      <ReadingBooks theme={'dark'} type={'mypage'}/>
      <Read />
    </Container>
  );
}

const Container = styled.div`
  background-color: #5c5649;
`;
