import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import logo from "../../Assets/Images/logo-white.png";
import Step from "./Step";

export default function Survey() {
  const step = Number(useParams().step);
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    if (step === 1) {
      setQuestion("당신의\n 성별을 알려주세요!");
    } else if (step === 2) {
      setQuestion("당신이 책을 읽는 이유는\n 무엇인가요?");
    } else if (step === 3) {
      setQuestion("요즘 기분은 어떠세요?");
    } else if (step === 4) {
      setQuestion("어떤 분야에\n 가장 관심이 있으신가요?");
    } else {
      setQuestion("가장 감명깊게 읽은 책을\n 알려주세요.");
    }
  }, [step]);

  return (
    <Container>
      <Logo src={logo} />
      <Question>{question}</Question>
      <BarContainer>
        <ul>
          <li>
            <ProgressBar className={`step${step}`} />
          </li>
        </ul>
      </BarContainer>
      <Contents>
        <Step step={step} />
      </Contents>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  background: #5c5649;
  width: 100%;
  height: 100vh;
  position: relative;
  white-space: pre-line;
`;

const Logo = styled.img`
  width: 13%;
  position: absolute;
  top: 2%;
  left: 4%;
  display: block;
`;

const Question = styled.div`
  position: absolute;
  left: 50%;
  top: 7rem;
  text-align: center;
  color: white;
  font-family: "Gowun Batang", serif;
  transform: translate(-50%, 0%);
  font-size: 1.2rem;
  min-width: 80%;
`;

const BarContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  top: 12rem;
  transform: translate(-50%, 0%);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  ul {
    position: relative;
    padding: 0;
    list-style: none;
    width: 75%;
    li {
      background-color: #ffffff48;
      height: 8px;
      border-radius: 10px;
    }
  }
`;

const ProgressBar = styled.div`
  /* width: 80%;  */
  position: absolute;
  border-radius: 10px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  height: 8px;
  &.step1 {
    -moz-animation: step1 1.5s ease-out;
    -webkit-animation: step1 1.5s ease-out;
    width: 20%;
  }
  &.step2 {
    -moz-animation: step2 1.5s ease-out;
    -webkit-animation: step2 1.5s ease-out;
    width: 40%;
  }
  &.step3 {
    -moz-animation: step3 1.5s ease-out;
    -webkit-animation: step3 1.5s ease-out;
    width: 60%;
  }
  &.step4 {
    -moz-animation: step4 1.5s ease-out;
    -webkit-animation: step4 1.5s ease-out;
    width: 80%;
  }
  &.step5 {
    -moz-animation: step5 1.5s ease-out;
    -webkit-animation: step5 1.5s ease-out;
    width: 100%;
  }
  &:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    top: -4px;
    right: 0;
    border-radius: 50%;
    background-color: white;
  }
  @keyframes step1 {
    0% {
      width: 0%;
    }
    100% {
      width: 20%;
    }
  }
  @keyframes step2 {
    0% {
      width: 20%;
    }
    100% {
      width: 40%;
    }
  }
  @keyframes step3 {
    0% {
      width: 40%;
    }
    100% {
      width: 60%;
    }
  }
  @keyframes step4 {
    0% {
      width: 60%;
    }
    100% {
      width: 80%;
    }
  }
  @keyframes step5 {
    0% {
      width: 80%;
    }
    100% {
      width: 100%;
    }
  }
`;

const Contents = styled.div`
  background-color: white;
  width: 100%;
  min-height: 63%;
  position: absolute;
  top: 37%;
  border-radius: 40px 40px 0 0;
`;
