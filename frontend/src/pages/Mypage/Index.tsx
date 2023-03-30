import React from "react";
import Read from "./Read";
import MypageBanner from "./MypageBanner";
import styled from "styled-components";
import Reading from "./Reading";
import useSelectorTyped from "../../Store";

export default function Mypage() {
  const nickname = useSelectorTyped((state) => state.user.name);
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

const ReadText = styled.div`
  color: #f9f9f7;
  padding-top: 3%;
  margin-left: 5%;
  size: 13px;
`;
