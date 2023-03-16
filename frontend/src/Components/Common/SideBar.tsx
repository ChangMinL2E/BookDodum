import React, { ReactElement, useState } from "react";
import styled from "styled-components";

export default function SideBar({showSide} : {showSide:boolean}): ReactElement {
  
  return (
    <>
      <Container>
        사이드바
        <CloseBtn id="check-label"> X </CloseBtn>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0px;
  display: block;
  background-color: yellow;
  width: 200px;
  display: flex;
  flex-direction: column;
  transform: translatex(-110%);
  transition: transform 0.4s ease-in-out;
`;

const CloseBtn = styled.div``;
