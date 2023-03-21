import React from "react";
import styled from "styled-components";
import ListCard from "./ListCard";
import sample from "../../Assets/Images/sample.png";
import profile from "../../Assets/Images/oneline.png";

export default function List() {

  let title: string = "구의 증명을 읽고난 후,";
  let writer: string = "얌얌이";
  let context: string =
    "사랑, 집착 무엇으로도 해석할 수 없는 그들을 온전히 이해할 순 없지만 어쩌면 우리도 인간관계에서 그렇게 지내고 있는지도 모르겠다. 작은 관계에서 그것에 온전히 또 ...";
  let chatCnt: number = 3;
  let id: number = 1;

  return (
    <ListBack>
      <ListText>모임</ListText>
      <ListCard
        title={title}
        writer={writer}
        context={context}
        chatCnt={chatCnt}
        bookImg={sample}
        profileImg={profile}
        id={id}
      />
      <ListCard
        title={title}
        writer={writer}
        context={context}
        chatCnt={chatCnt}
        bookImg={sample}
        profileImg={profile}
        id={2}
      />
      <ListCard
        title={title}
        writer={writer}
        context={context}
        chatCnt={chatCnt}
        bookImg={sample}
        profileImg={profile}
        id={3}
      />
    </ListBack>
  );
}

const ListBack = styled.div`
  min-height: 56%;
  padding: 5px;
  bottom: 0;
  background-color: #f7f3eb;
`;

const ListText = styled.div`
  color: #5c5649;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  font-size: 1.3rem;
  text-decoration: underline;
  margin: 15px 0px 15px 20px;
`;
