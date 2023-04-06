import React, { useEffect, useState } from "react";
import oilpainting from "../../Assets/Images/oilpainting.png";
import oneline from "../../Assets/Images/oneline.png";
import styled from "styled-components";
import Loading from "../../Components/Common/Loading";

type option = {
  name: string;
  value: string;
  image: string;
};

interface Props {
  handleSubmit: () => void;
  korean: string;
  setKorean: Function;
  setSelectedOption: Function;
  selectedOption: string;
}

export default function Form({
  handleSubmit,
  korean,
  setKorean,
  setSelectedOption,
  selectedOption,
}: Props) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKorean(e.target.value);
  };

  const options: option[] = [
    {
      name: "oil-painting",
      value: "oilpainting",
      image: oilpainting,
    },
    {
      name: "oneline-drawing",
      value: "oneline drawing",
      image: oneline,
    },
  ];
  const [isLoading, setIsLoading] = useState<boolean>(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 5000);

  return (
    <Container>
      <Title>기억나는 장면이나 문구를 그림으로 남겨드립니다.</Title>
      <form>
        <Input
          type="text"
          value={korean}
          placeholder="여기에 글을 작성해 주세요."
          onInput={handleInput}
        />
      </form>
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          {options.map((option, idx) => (
            <Option key={idx}>
              <Image>
                <img src={option.image} width="80px" height="80px" />
              </Image>
              <OptionValue>
                <input
                  type="radio"
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                <OptionName>{option.name}</OptionName>
              </OptionValue>
            </Option>
          ))}
        </Wrapper>
      )}

      <ButtonContainer>
        <Button type="submit" onClick={handleSubmit}>
          변환하기
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  margin: 10% auto;
`;

const Title = styled.div`
  color: #5c5649;
  font-weight: bold;
  margin-top: 0.3rem;
`;

const Input = styled.input`
  width: 100%;
  height: 10vh;
  padding-left: 5% 5% 5% 5%;
  margin-top: 1.2rem;
  border: 1px solid #d9d9d9;
  border-radius: 5px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c9c9c9;
  }
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

const Image = styled.div`
  margin: auto;
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
