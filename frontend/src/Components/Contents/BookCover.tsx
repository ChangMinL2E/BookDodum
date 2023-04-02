import React, { useState } from 'react';
import styled from 'styled-components';


interface Props {
  imageUrl: string;
  size: number;
  name?: string;
}

export default function BookCover({ imageUrl, size, name }: Props) {
  return (
    <Container>
      {imageUrl === '' ?
        <BookImage className={name} size={size} imageUrl={''}>
          <div>No image</div>
          <Border/>
        </BookImage> :
        <BookImage className={name} size={size} imageUrl={imageUrl} >
          <Border/>
        </BookImage>
      }
    </Container>
  );
}

const Container = styled.div`
    margin: 0 3% 0 3%;
`
const BookImage = styled.div<Props>`
  width: ${(props: Props) => `${props.size}px`};
  height: ${(props: Props) => `${props.size * 1.48}px`};
  background-image: url(${(props: Props) => props.imageUrl});
  background-size: contain;
  background-repeat : none;
  box-shadow: 2px 5px 4px 0px #00000040;
  margin: auto;
  &.bookImg {
    position: absolute;
  }
  &.bannerimg {
    position: relative;
    top:10px;
    left:50px;
  }
  display: flex;
  justify-content: center;
  align-items : center;
  ::before {
    content: "";
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.2) 0px, transparent 5%, transparent 95%, rgba(0, 0, 0, 0.2) 100%);
  }
  position : relative
`;


const Border = styled.div`
   box-sizing: border-box;
    opacity: 0.2;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 3;
    border: 1px solid #000;
`