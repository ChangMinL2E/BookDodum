import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";

interface Props {
  image: string;
  text: string;
}

export default function ReasonCard(reason: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      navigate("/survey/3");
    }, 1000);
  };

  return (
    <ReasonItem onClick={handleClick} className={isAnimating ? "bounce" : ""}>
      <Reason src={reason.image} />
      <Text>{reason.text}</Text>
    </ReasonItem>
  );
}

const ReasonItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &.bounce {
    animation-duration: 1s;
    animation-name: ${keyframes`
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      60% {
        transform: translateY(-20px);
      }
    `};
  }
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
