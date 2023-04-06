import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";

interface Props {
  field: string;
}

export default function FieldCard({ field }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      navigate("/survey/5");
    }, 1000);
  };

  return (
    <FieldItem onClick={handleClick} className={isAnimating ? "bounce" : ""}>
      <Field>{field}</Field>
    </FieldItem>
  );
}

const FieldItem = styled.div`
  background-color: #f7f3ebae;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 3%;
  padding: 3%;
  &.bounce {
    animation-duration: 1s;
    animation-name: ${keyframes`
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-20px);
      }
      60% {
        transform: translateY(-10px);
      }
    `};
  }
`;

const Field = styled.div`
  font-size: 1.05rem;
  margin: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Gowun Batang", serif;
  font-weight: 600;
`;
