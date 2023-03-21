import React from 'react';
import styled from 'styled-components';
// import ImageAI from ''


// types.ts
interface ImageProps {
    imageUrl : string;
    size: string;
    name?: string;
}

// inage: strig, size: stim
export default function ImageAI({imageUrl, size,name} : ImageProps) {
    return (
        <Image className={name} imageUrl={imageUrl} size={size}/>            
    );
}

const Image = styled.div<ImageProps>`
    width: ${(props: ImageProps) => props.size};
    height: ${(props: ImageProps) => props.size};
    background-image: url(${(props:ImageProps) => props.imageUrl});
    background-size: contain;
    &.img {
        z-index: 1;
        position:relative;
        top: 110px;
        left: 60px;
    }
`;

