import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import intro from "../../Assets/Images/intro.png";

export default function Intro() {
  const [ref, inView] = useInView();
  const navigate = useNavigate();

  return (
    <Container>
      <BackGround src={intro}></BackGround>
      <Contents ref={ref} className={inView ? "fadeout" : ""}>
        <Title>
          북,돋움이 추천하는
          <br />
          당신만을 위한 도서는?
        </Title>
        <Login
          onClick={() => {
            navigate("/login");
          }}
        >
          <div>로그인</div>
        </Login>
        <SignUp
          onClick={() => {
            navigate("/signup");
          }}
        >
          북,돋움이 처음이세요?{" "}
          <span style={{ textDecoration: "underline" }}>회원가입</span>
        </SignUp>
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
`;

const BackGround = styled.img`
  width: 100%;
  max-width: 35rem;
  display: block;
  position: absolute;
  z-index: -1;
`;

const Contents = styled.div`
  max-width: 33rem;
  width: 80%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, 0%);
  &.fadein {
    animation: fadeIn 2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, 30%);
    }
    to {
      opacity: 3;
      transform: translate(-50%, 0%);
    }
  }
`;

const Title = styled.div`
  margin-bottom: 30%;
  color: #f7f3eb;
  font-size: 1.5rem;
  font-family: "Gowun Batang", serif;
`;

const Login = styled.div`
  background-color: #f7f3eb;
  width: 104%;
  max-width: 24rem;
  height: 50px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5c5649;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 5%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;

const SignUp = styled.div`
  color: #f7f3eb;
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
`;
