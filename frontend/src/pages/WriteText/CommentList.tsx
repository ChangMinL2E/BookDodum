import React, { useState } from "react";
import Comment from "./Comment";
import styled from "styled-components";

export default function CommentList() {
  let [comments, setComments] = useState<string[]>([]);
  let tmp = [
    "안녕",
    "반가워 내 이름은 혜씌야 너는 누구인지 알려줄 수 있을까?",
    "이 작품에는 편의점에서 자주 볼 수 있는 원 플러스 원이나 네 캔 만원, 편의점 음식 조합에 대한 이야기를 맛깔나게 풀어낸다. 꼭 편의점에 와있는 것 같은 기분이다.",
  ];
  let odd = tmp.filter((comment, idx) => {
    return idx % 2 === 0;
  });

  let even = tmp.filter((comment, idx) => {
    return idx % 2 === 1;
  });

  return (
    <Container>
      <FirstBox>
        <>
          {odd?.map((comment) => {
            return <Comment comment={comment}></Comment>;
          })}
        </>
      </FirstBox>

      <SecondBox>
        <>
          {even?.map((comment) => {
            return <Comment comment={comment}></Comment>;
          })}
        </>
      </SecondBox>
    </Container>
  );
}

const Container = styled.div`
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
