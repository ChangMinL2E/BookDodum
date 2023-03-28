import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { getMeetingCommentAPI } from "../../apis/meeting";
import NavBack from "../../Components/Contents/NavBack";
import ListCard from "./ListCard";

interface Info {
  commentId: number;
  userId: number;
  leader_content: string | null;
  content: string;
}

export default function List() {
  const [comments, setComments] = useState<Info[]>([]);
  const location = useLocation();
  const title = location?.state?.title;
  const id: number = Number(useParams().meetid);

  useEffect(() => {
    getMeetingComment(id);
  }, []);

  // 모임 내부 axios 불러오기
  const getMeetingComment = async (id: number) => {
    const data = await getMeetingCommentAPI(id);
    let list: Info[] = [];

    data.forEach((item: Info) => {
      list.push({
        commentId: item.commentId,
        userId: item.userId,
        leader_content: item.leader_content,
        content: item.content,
      });
    });

    setComments(list);
  };

  return (
    <Container>
      <NavBack text={title} link={"/bookmeeting"} />
      <Wrapper>
        {comments.map((info: Info, idx) => (
          <ListCard {...info} key={idx} />
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
