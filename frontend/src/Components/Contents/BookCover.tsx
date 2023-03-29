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
        <BookImage className={name} size={size} imageUrl={''}><div>
          No image
        </div>
        </BookImage> :
        <BookImage className={name} size={size} imageUrl={imageUrl} />
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
`;
