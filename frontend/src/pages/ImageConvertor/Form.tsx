import React, { useEffect, useState } from "react";
import oilpainting from "../../Assets/Images/oilpainting.png";
import oneline from "../../Assets/Images/oneline.png";
import styled from "styled-components";
import { getTextAPI } from "../../apis/translate";
import { changeImageAPI } from "../../apis/changeImage";

type option = {
  name: string;
  image: string;
};

const Form: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(""); // 그림 옵션 선택
  const [korean, setKorean] = useState<string>(""); // 번역할 문장
  const [sentence, setSentence] = useState<string>(""); // 번역된 문장
  const [result, setResult] = useState<string>(""); // 번역 + 화풍
  const [image, setImage] = useState(); // 변환된 이미지 url

  const options: option[] = [
    {
      name: "oilpainting",
      image: oilpainting,
    },
    {
      name: "oneline drawing",
      image: oneline,
    },
  ];

  // 변환하기 버튼 눌렀을 때 번역 문장 받기
  const handleSubmit = async () => {
    const data = await getTextAPI(korean);
    setSentence(data);
  };

  // 번역 문장 + 화풍 합치기
  useEffect(() => {
    if (sentence !== "")
      setResult(result.concat(sentence, " ", selectedOption));
  }, [sentence]);

  // dall-e-2에 문장 axios
  const changeImage = async (result: string) => {
    const imageUrl = await changeImageAPI(result);
    setImage(imageUrl);
  };

  useEffect(() => {
    if (result !== "") changeImage(result);
  }, [result]);

  return (
    <Container>
      <Title>여러분의 생각을 그림으로 남겨드립니다.</Title>
      <form>
        <Input
          type="text"
          value={korean}
          placeholder="책을 읽고 소감을 작성해 보세요.&#13;&#10;
        예시) 들판에 핀 안개 꽃"
          onChange={(e) => setKorean(e.target.value)}
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
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <OptionName>{option.name}</OptionName>
            </OptionValue>
          </Option>
        ))}
      </Wrapper>
      <ButtonContainer>
        <Button type="submit" onClick={handleSubmit}>
          변환하기
        </Button>
        {/* <img src={image} width="80px" height="80px" /> */}
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
