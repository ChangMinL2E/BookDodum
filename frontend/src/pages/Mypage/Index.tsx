import React from "react";
import Read from "./Read";
import MypageBanner from "./MypageBanner";
import styled from "styled-components";
import ReadingBooks from "../Home/ReadingBooks";


export default function Mypage() {
  return (
    <Container>
      <MypageBanner />
      {/* <ReadingBooks theme={"dark"}/> */}
      <ReadingBooks/>
      <Read />
    </Container>
  );
}

const Container = styled.div`
  background-color: #5c5649;
  height: 100vh;
`;
