import React from "react";
import styled from "styled-components";

interface Props {
  imageUrl: string|undefined;
  size: string;
  name?: string;
}

// handlechange 이벤트 
export default function ImageAI({ imageUrl, size, name}: Props) {
  return (
    <>
      <Container>
        <Image className={name} imageUrl={imageUrl} size={size}  />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
`;

const Image = styled.div<Props>`
  width: ${(props: Props) => props.size};
  height: ${(props: Props) => props.size};
  background-image: url(${(props: Props) => `${props.imageUrl}`});
  background-size: contain;
  background-repeat: none;
  cursor: pointer;
  &.img {
    z-index: 1;
    position: relative;
    top: 100px;
    left: 60px;
  }
  &.select{
    border: 5px solid black;
  }
`; 


