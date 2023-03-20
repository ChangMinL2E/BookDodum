import React from 'react';
import styled from 'styled-components';

interface Props {
    imageUrl: string;
    size: number;
}

export default function BookCover({imageUrl, size}: Props) {
    return (
        <BookImage size={size} imageUrl={imageUrl}/>            
    );
}

const BookImage = styled.div<Props>`
  width: ${(props:Props) => `${props.size}px`};
  height: ${(props:Props) => `${props.size*1.48}px`};
  background-image: url(${(props:Props) => props.imageUrl});
  background-size: contain;
  box-shadow: 2px 5px 4px 0px #00000040;
  margin: auto;
`;
