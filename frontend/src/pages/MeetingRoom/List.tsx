import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getMeetingCommentAPI,
  postMeetingCommentAPI,
  postMeetingJoinAPI,
} from "../../apis/meeting";
import NavBack from "../../Components/Contents/NavBack";
import ListCard from "./ListCard";
import profile from "../../Assets/Images/oilpainting.png";

interface Info {
  commentId: number;
  userId: number;
  userName: string;
  leader_content: string | null;
  content: string;
}

interface Comment {
  meetingId: number;
  content: string;
}

export default function List() {
  const id: number = Number(useParams().meetid);

  const [comments, setComments] = useState<Info[]>([]);
  const location = useLocation();
  const title = location?.state?.title;

  // 모임지기의 말
  const master = location?.state?.userName;
  const masterContent = location?.state?.content;

  // 댓글 입력
  const [text, setText] = useState<string>("");

  // 댓글 올릴 때 필요한 정보
  const comment: Comment = {
    meetingId: id,
    content: text,
  };

  useEffect(() => {
    getMeetingComment(id);
  }, []);

  // 모임 댓글 axios 불러오기
  const getMeetingComment = async (id: number) => {
    const data = await getMeetingCommentAPI(id);
    let list: Info[] = [];

    data.forEach((item: Info) => {
      list.push({
        commentId: item.commentId,
        userId: item.userId,
        userName: item.userName,
        leader_content: item.leader_content,
        content: item.content,
      });
    });

    setComments(list);
  };

  // 댓글 작성하는 axios
  const postMeetingComment = async () => {
    await postMeetingCommentAPI(comment);
    postMeetingJoin();
    alert("댓글이 등록되었습니다.");
    setText("");
    getMeetingComment(id); // 등록한 후 axios 다시 호출
  };

  // enter로 댓글 등록하기
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      postMeetingComment();
    }
  };

  // 모임 참여하기
  const postMeetingJoin = async () => {
    await postMeetingJoinAPI(id);
  };

  return (
    <Container>
      <NavBack text={title} link={"-1"} />

      {/* 모임지기의 말 */}
      <Master style={{ backgroundColor: "#E7E1D2" }}>
        <ProfileImg src={profile} />
        <TopDiv>
          <Name>{master}</Name>
          <Owner>모임지기의 말</Owner>
        </TopDiv>
        <Text>{masterContent}</Text>
      </Master>

      {/* 모임 댓글 */}
      <Wrapper>
        {comments.map((info: Info) => (
          <ListCard {...info} key={info.commentId} />
        ))}
      </Wrapper>

      {/* 댓글 입력 */}
      <Input
        type="text"
        placeholder="생각을 나눠 주세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </Container>
  );
}

const Container = styled.div`
  background-color: #f9f9f7;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Master = styled.div``;

const ProfileImg = styled.img`
  border-radius: 100px;
  width: 45px;
  height: 45px;
  float: left;
  margin: 5%;
  display: flex;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  padding-top: 3%;
`;

const Name = styled.div`
  color: #9b9b9b;
  font-weight: 600;
`;

const Owner = styled.div`
  color: #9b9b9b;
  font-size: 0.8rem;
  margin: 2%;
`;

const Text = styled.div`
  font-size: 0.8rem;
  display: flex;
  padding: 0 5% 3% 0;
`;

const Input = styled.input`
  box-sizing: border-box;
  background-color: #f9f9f7;
  border: 8px solid #f7f3eb;
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 60px;
  padding: 3%;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c9c9c9;
  }
`;
