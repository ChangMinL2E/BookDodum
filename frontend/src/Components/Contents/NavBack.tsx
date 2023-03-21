import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 쓰는 방법
// import 하고 text=텍스트, link=navigate 할 곳
// <NavBack text="여기다가 넣으면 돼" link="/list"/>

type Props = {
  text : String;
  link: String;
}

const NavBack: React.FC<Props> = ({text, link}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <svg
      onClick={() => navigate(`${link}`)}
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="64" height="64" />
        <path
          d="M30.25 38.5L24 32.25ZM24 32.25L30.25 26ZM24 32.25H39Z"
          fill="white"
        />
        <path
          d="M30.25 38.5L24 32.25M24 32.25L30.25 26M24 32.25H39"
          stroke="#5C5649"
          strokeWidth="2"
        />
      </svg>
      <Text>{text}</Text>
    </Container>
  );
};

export default NavBack;


const Container = styled.div`
  width: 100vw;
  height: 64px;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #5c5649;
`;
