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
  const id: number = 2;

  useEffect(() => {
    getMeetingComment(id);
  }, []);

  // 모임 내부 axios 불러오기
  const getMeetingComment = async (id: number) => {
    const data = await getMeetingCommentAPI(id);
    let list: Info[] = []
    // data.forEach((item)=>{
    //   list.push({
        
    //   })
    // })
    setComments(data);
  };

  // 예시 정보
  const meetingInfo: Info[] = [];

  return (
    <Container>
      <NavBack text={props.title} link={"/bookmeeting"} />
      <Wrapper>
        {meetingInfo.map((info: Info) => (
          <ListCard {...info} key={info.id} />
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
