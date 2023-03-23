import React, { useState } from "react";
import oilpainting from "../../Assets/Images/oilpainting.png";
import oneline from "../../Assets/Images/oneline.png";
import styled from "styled-components";
type option = {
  name: string;
  image: string;
};

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
  const options: option[] = [
    {
      name: "oil painting",
      image: oilpainting,
    },
    {
      name: "one-line",
      image: oneline,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("oilpainting");
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Container>
      <Title>여러분의 생각을 그림으로 남겨드립니다.</Title>
      <form onSubmit={handelSubmit}>
        <Input
          type="text"
          value={text}
          placeholder="책을 읽고 소감을 작성해 보세요.&#13;&#10;
        예시) 들판에 핀 안개 꽃"
          onChange={handleTextChnage}
        />
      </form>
      <Wrapper>
        {options.map((option, idx) => (
          <Option key={idx}>
            <img src={option.image} width="80px" height="80px" />
            <OptionValue>
              <input
                type="radio"
                value={option.name}
                checked={selectedOption === option.name}
                onChange={handleOptionChange}
              />
              <OptionName>{option.name}</OptionName>
            </OptionValue>
          </Option>
        ))}
      </Wrapper>
      <ButtonContainer>
        <Button type="submit">변환하기</Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  margin: auto;
`;

const Title = styled.div`
  color: #5c5649;
  font-weight: bold;
  margin-top: 0.3rem;
`;
const Input = styled.input`
  width: 100%;
  height: 10vh;
  margin-top: 0.4rem;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 1.2rem;
`;

const Option = styled.label`
  display: flex;
  flex-direction: column;
`;

const OptionValue = styled.div`
  display: flex;
`;
const OptionName = styled.span`
  color: #5c5649;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  border-radius: 1.5rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 8px;
  background-color: #dbd4c3;
  height: 25px;
  width: 80px;
  color: #5c5649;
`;
export default Form;
