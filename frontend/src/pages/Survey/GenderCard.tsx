import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";

interface Props {
  image: string;
  text: string;
}

export default function GenderCard(gender: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      navigate("/survey/2");
    }, 1000);
  };

  return (
    <GenderItem onClick={handleClick} className={isAnimating ? "bounce" : ""}>
      <Gender src={gender.image} />
      <Text style={{ fontSize: "1.2rem" }}>{gender.text}</Text>
    </GenderItem>
  );
}

const GenderItem = styled.div`
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

const Gender = styled.img`
  width: 130px;
  height: 130px;
  margin: 10%;
`;

const Text = styled.div`
  font-size: 0.95rem;
  font-family: "Gowun Batang", serif;
  text-align: center;
  font-weight: 600;
`;
