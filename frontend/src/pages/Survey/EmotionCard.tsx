import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";

interface Props {
  image: string;
  text: string;
}

export default function EmotionCard(emotion: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      navigate("/survey/4");
    }, 1000);
  };

  return (
    <Emotion onClick={handleClick} className={isAnimating ? "bounce" : ""}>
      <EmotionImg src={emotion.image} />
    </Emotion>
  );
}

const Emotion = styled.div`
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

const EmotionImg = styled.img`
  height: 40px;
  margin: 12%;
`;
