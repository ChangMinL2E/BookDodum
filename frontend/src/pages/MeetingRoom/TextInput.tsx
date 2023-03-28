import { useState } from "react";
import styled from "styled-components";
import { postMeetingCommentAPI } from "../../apis/meeting";

interface Comment {
  meetingId: number;
  content: string;
}

interface Props {
  id: number;
}

export default function TextInput(id: Props) {
  const [text, setText] = useState<string>("");

  const comment: Comment = {
    meetingId: id.id,
    content: text,
  };

  const postMeetingComment = async () => {
    await postMeetingCommentAPI(comment);
    alert("등록되었습니다.");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      postMeetingComment();
    }
  };

  return (
    <Input
      type="text"
      placeholder="생각을 나눠 주세요"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
}

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
