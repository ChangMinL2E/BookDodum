import React, { useState } from 'react';
import styled from 'styled-components';


interface Props {
  imageUrl: string;
  size: number;
  name?: string;
}

<<<<<<< HEAD
export default function BookCover({ imageUrl, size, name }: Props) {
  return (
    <Container>
      <BookImage className={name} size={size} imageUrl={imageUrl} />
    </Container>
  );
=======
export default function BookCover({imageUrl, size, name}: Props) {
    return (
      <Container>
        <BookImage className={name} size={size} imageUrl={imageUrl}/>            
      </Container>
    );
>>>>>>> d92c82335041c6066b020a4463b1a9fac00b1adc
}

const Container = styled.div`
    margin: 0 5% 0 0;
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
    top:30px;
    left:50px;
  }
`;
