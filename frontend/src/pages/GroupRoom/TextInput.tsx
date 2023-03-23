import { useState } from "react";
import styled from "styled-components";

export default function TextInput() {
  const [text, setText] = useState<string>("");

  const handleSubmit = () => {
    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
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
