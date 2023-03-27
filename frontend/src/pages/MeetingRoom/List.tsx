import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getMeetingCommentAPI } from "../../apis/meeting";
import NavBack from "../../Components/Contents/NavBack";
import ListCard from "./ListCard";

interface Props {
  title: string;
}

interface Info {
  name: string;
  owner: boolean;
  text: string;
  id: number;
}

export default function List(props: Props) {
  const [comments, setComments] = useState();
  const id: number = 1;

  useEffect(() => {
    getMeetingComment(id);
  }, []);

  // 모임 내부 axios 불러오기
  const getMeetingComment = async (id: number) => {
    const data = await getMeetingCommentAPI(id);
    setComments(data);
  };

  // 예시 정보
  const meetingInfo: Info[] = [
    {
      id: 1,
      name: "독서왕 최종욱",
      owner: true,
      text: "할아버지의 죽음 이후 이모와 생활하는 여자 주인공 담과 빚에 시달리는 부모님 때문에 학생임에도 쉼 없이 일하는 남자 주인공 구의 이야기이다. 둘은 여덟 살 때 처음 만나 서로의 삶에서 유일한 존재가 된다. 주변 사람들의 시선에 의해 한 번, 소중한 동생의 죽음 후 두 번, 도망자의 생활로 인해 세 번 헤어지는 시간을 갖지만 그 시간 중에도 서로에 대한 생각을 끝없이 하면서 서로가 서로를 갈망한다. ",
    },
    {
      id: 2,
      name: "디우",
      owner: false,
      text: "순수했던 동생 노마의 죽음을 눈앞에서 목격하고 큰 충격을 받은 둘은 꽤 오랜 시간 멀어지게 된다. 구는 공장에서 알게 된 누나와 관계를 맺고, 이후 군대로 도피하고 담은 이모의 죽음을 경험하고 자신에게 돌아올 구를 기다린다. 그 후 다시 만나게 됐지만, 부모님의 빚으로 도망자가 된 구로 인해 둘은 전국을 돌면서 불안한 일상을 살게 된다. 구는 죽게 되고, 구를 잃게 된 담은 구를 다른 사람에게 뺏기지 않도록, 살아서도 죽어서도 함께 할 수 있도록 구를 먹는다. ",
    },
    {
      id: 3,
      name: "독서왕 최종욱",
      owner: true,
      text: "지우님의 글을 읽고 또 다른 관점에서 생각하게 되네요,,, 감사드립니다!",
    },
  ];

  return (
    <Container>
      <NavBack text={props.title} link={"/bookmeeting"} />
      <Wrapper>
        {meetingInfo.map(({ name, owner, text, id }: Info) => (
          <ListCard name={name} owner={owner} text={text} id={id} key={id} />
        ))}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f9f9f7;
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div``;
