import React, { useState, useEffect } from "react";
import styled from "styled-components";

// step1
import woman from "../../Assets/Images/woman.png";
import man from "../../Assets/Images/man.png";

// step2
import healing from "../../Assets/Images/healing.png";
import development from "../../Assets/Images/development.png";
import funny from "../../Assets/Images/funny.png";
import bestseller from "../../Assets/Images/bestseller.png";
import spec from "../../Assets/Images/spec.png";
import confidence from "../../Assets/Images/confidence.png";

// step3
import happy from "../../Assets/Images/happy.png";
import love from "../../Assets/Images/love.png";
import boring from "../../Assets/Images/boring.png";
import sad from "../../Assets/Images/sad.png";
import frustrated from "../../Assets/Images/frustrated.png";
import farewell from "../../Assets/Images/farewell.png";
import unrest from "../../Assets/Images/unrest.png";
import stress from "../../Assets/Images/stress.png";

interface Prop {
  step?: string;
}

interface Item {
  image: string;
  text: string;
}

export default function Step({ step }: Prop) {
  const stepN = Number(step);
  const sessionGet: any = sessionStorage.getItem("list");

  // const surveyInfo = sessionGet
  //   ? JSON.parse(sessionGet)
  //   : sessionStorage.setItem("list", JSON.stringify([]));

  const [surveyList, setSurveyList] = useState(JSON.parse(sessionGet) || '[]');

  useEffect(() => {
    sessionStorage.setItem("list", JSON.stringify(surveyList))
  }, [surveyList])

  const [book, setBook] = useState<string>("");

  const saveSession = (value: string) => {
    setSurveyList([...surveyList, value]);
  };

  const reasons: Item[] = [
    { image: healing, text: "힐링" },
    { image: development, text: "자기계발" },
    { image: funny, text: "재미" },
    { image: bestseller, text: "베스트 셀러" },
    { image: spec, text: "스펙" },
    { image: confidence, text: "자존감" },
  ];

  const emotions: Item[] = [
    { image: happy, text: "행복" },
    { image: love, text: "사랑" },
    { image: boring, text: "심심" },
    { image: sad, text: "우울" },
    { image: frustrated, text: "답답" },
    { image: farewell, text: "이별" },
    { image: unrest, text: "불안" },
    { image: stress, text: "스트레스" },
  ];

  return (
    <Container>
      {stepN === 1 ? (
        <GenderDiv>
          <GenderItem
            onClick={() => {
              saveSession("여성");
            }}
          >
            <Gender src={woman} />
            <Text style={{ fontSize: "1.2rem" }}>여성</Text>
          </GenderItem>
          <GenderItem
            onClick={() => {
              saveSession("남성");
            }}
          >
            <Gender src={man} />
            <Text style={{ fontSize: "1.2rem" }}>남성</Text>
          </GenderItem>
        </GenderDiv>
      ) : null}

      {stepN === 2 ? (
        <ReasonDiv>
          {reasons.map((reason: Item) => (
            <ReasonItem
              key={reason.text}
              onClick={() => {
                saveSession(reason.text);
              }}
            >
              <Reason src={reason.image} />
              <Text>{reason.text}</Text>
            </ReasonItem>
          ))}
        </ReasonDiv>
      ) : null}

      {stepN === 3 ? (
        <EmotionDiv>
          {emotions.map((emotion, idx) => (
            <Emotion
              key={idx}
              onClick={() => {
                saveSession(emotion.text);
              }}
            >
              <EmotionImg src={emotion.image} />
            </Emotion>
          ))}
        </EmotionDiv>
      ) : null}

      {stepN === 4 ? <div></div> : null}

      {stepN === 5 ? (
        <InputDiv>
          <Input
            onChange={(e) => {
              setBook(e.target.value);
            }}
            placeholder="책 제목을 입력해주세요."
          />
        </InputDiv>
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10%;
`;

const GenderDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-top: 15%;
`;

const GenderItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Gender = styled.img`
  width: 130px;
  height: 130px;
  margin: 10%;
`;

const ReasonDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const Reason = styled.img`
  width: 100px;
  height: 100px;
  margin: 10%;
`;

const Text = styled.div`
  font-size: 0.95rem;
  font-family: "Gowun Batang", serif;
  text-align: center;
  font-weight: 600;
`;

const ReasonItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmotionDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const Emotion = styled.div`
  /* background-color: #F2F2F2;
    border-radius: 55px;
    margin: 3%; */
`;

const EmotionImg = styled.img`
  height: 40px;
  margin: 8%;
`;

const InputDiv = styled.div`
  position: relative;
  height: 300px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #5c5649;
  font-size: 1.1rem;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
