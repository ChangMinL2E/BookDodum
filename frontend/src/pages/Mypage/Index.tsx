import React from "react";
import Read from "./Read";
import MypageBanner from "./MypageBanner";
import styled from "styled-components";
import Reading from "./Reading";

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
