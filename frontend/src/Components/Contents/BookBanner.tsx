import React from 'react';
import styled from 'styled-components';
import bookBanner from '../../Assets/Images/bookBanner.png'
import BookCover from './BookCover';
import sample from '../../Assets/Images/sample.png'


export default function BookBanner() {
    return (
        <>
        <BannerImage>
            <BookCover name={'bannerimg'} imageUrl={sample} size={120}/>
        </BannerImage>
        </>
    );
}
const BannerImage = styled.div`
    width: 100vw;
    height: 30vh;
    background: url(${bookBanner});
    background-size: cover;
    position: absolute;
`
