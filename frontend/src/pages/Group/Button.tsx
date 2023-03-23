import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function Button() {
  const navigate = useNavigate();
  const createRoom = () => {
    navigate("/groupcreate");
  };

  return <Btn onClick={createRoom}>모임 만들기</Btn>;
}

// styled components
const Btn = styled.button`
  border: 1px solid #a09987;
  font-size: 0.7rem;
  border-radius: 2px;
  color: #a09987;
  background-color: transparent;
  margin: 3%;
  font-weight: 600;
  padding: 1.5%;
`;
