import React, { useState } from "react";
import oilpainting from "../../Assets/Images/oilpainting.png";
import oneline from "../../Assets/Images/oneline.png";
import styled from "styled-components";

const Title = styled.div`
  color: #5c5649;
  font-weight: bold;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 50%;
`;
const Form: React.FC = () => {
  const [text, setText] = useState<string>("");

  const handleTextChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handelSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setText("");
    console.log(text);
  };
  const options: string[] = ["oilpainting", "one-line"];
  const [selectedOption, setSelectedOption] = useState<string>("oilpainting");
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Title>여러분의 생각을 그림으로 남겨드립니다.</Title>
      <Wrapper>
        <form onSubmit={handelSubmit}>
          <input
            type="text"
            value={text}
            placeholder="책을 읽고 소감을 작성해 보세요.
        예시) 들판에 핀 안개 꽃"
            onChange={handleTextChnage}
          />
        </form>
      </Wrapper>
      <div>
        <img src={oilpainting} width="40px" height="40px" />
        <img src={oneline} width="40px" height="40px" />
      </div>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
            />
            {option}
          </label>
        ))}
      </div>
      <button type="submit">변환하기</button>
    </>
  );
};

export default Form;
