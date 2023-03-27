import React from 'react';
import mypagebanner from '../../Assets/Images/mypagebanner.png'
import styled from 'styled-components';

export default function MypageBanner() {
    return (
        <>
       <BannerImage>
       </BannerImage>
        </>
    );
}
const BannerImage = styled.div`
    width: 100vw;
    height: 30vh;
    background-image: url(${mypagebanner});
    background-size: cover;
`

