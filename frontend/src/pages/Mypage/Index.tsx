import React from "react";
import Read from "./Read";
import MypageBanner from "./MypageBanner";
import Reading from "./Reading";
import styled from "styled-components";


export default function Mypage() {
  return (
    <Container>
      <MypageBanner />
      <Reading />
      <Read />
    </Container>
  );
}

const Container = styled.div`
  background-color: #5c5649;
  height: 100vh;
`;
