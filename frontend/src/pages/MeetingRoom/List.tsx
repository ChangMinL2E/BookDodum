import React, { useState, useEffect } from "react";
import { InView, useInView } from "react-intersection-observer";
import { useLocation, useParams } from "react-router-dom";
import profile from "../../Assets/Images/profile.png";
import styled from "styled-components";
// Components
import NavBack from "../../Components/Contents/NavBack";
import ListCard from "./ListCard";
// APIs
import {
  getMeetingCommentAPI,
  postMeetingCommentAPI,
  postMeetingJoinAPI,
  getCommentAuthorityAPI,
} from "../../apis/meeting";
import { CommentInfo } from '../../Store/Types'

interface Comment {
  meetingId: number;
  content: string;
}

export default function List() {
  const id: number = Number(useParams().meetid);

  const [idx, setIdx] = useState<number>(0);
  const [ref, inView] = useInView();

  const [comments, setComments] = useState<CommentInfo[]>([]);
  const location = useLocation();
  const title = location?.state?.title;

  // 모임지기의 말
  const master = location?.state?.userName;
  const masterContent = location?.state?.content;

  // 댓글 입력
  const [text, setText] = useState<string>("");

  // 댓글 권한
  const [authority, setAuthority] = useState<boolean>(false);

  // 댓글 올릴 때 필요한 정보
  const comment: Comment = {
    meetingId: id,
    content: text,
  };

  // useEffect(() => {
  //   getMeetingComment(idx);
  // }, [idx]);

  // 무한 스크롤
  useEffect(() => {
    if (InView) {
      console.log('😀')
      getMeetingComment(comments[comments.length - 1]?.commentId)
      setIdx(comments[comments.length - 1]?.commentId);
    }
  }, [inView]);

  // 모임 댓글 axios 불러오기
  const getMeetingComment = async (idx: number) => {
    const data = await getMeetingCommentAPI(id, idx);
    let list: CommentInfo[] = [];

    data.forEach((item: CommentInfo) => {
      list.push({
        commentId: item.commentId,
        userId: item.userId,
        userName: item.userName,
        leader_content: item.leader_content,
        content: item.content,
      });
    });
    setComments([...comments, ...list]);
  };

  // 댓글 작성하는 axios
  const postMeetingComment = async () => {
    await postMeetingCommentAPI(comment);
    alert("댓글이 등록되었습니다.");
    setText("");
    postMeetingJoin();
    getMeetingComment(idx); // 등록한 후 axios 다시 호출
  };

  // enter로 댓글 등록하기
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (text.trim() !== "") {
        postMeetingComment();
      } else {
        alert("댓글을 입력해주세요.");
      }
    }
  };

  const getCommentAuthority = async () => {
    const data = await getCommentAuthorityAPI(id);
    setAuthority(data);
  };

  useEffect(() => {
    getCommentAuthority();
  }, []);

  // 모임 참여하기
  const postMeetingJoin = async () => {
    await postMeetingJoinAPI(id);
  };

  return (
    <Container>
      <NavBack text={title} link={"-1"} />

      <Comment>
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
          {comments?.map((info: CommentInfo) => (
            <ListCard {...info} key={info.commentId} />
          ))}
          <Ref ref={ref} style={{ height: authority ? "61px" : "0px" }} />
        </Wrapper>
      </Comment>

      {/* 댓글 입력 */}
      {authority ? (
        <Input
          type="text"
          placeholder="생각을 나눠 주세요"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  background-color: #f9f9f7;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div`
  height: 95%;
  overflow-y: scroll;
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

const Ref = styled.div`
  width: 100%;
`;
