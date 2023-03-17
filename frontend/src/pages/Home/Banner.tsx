import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';

const Slide = styled.div`
    width: 100vw;
    height: 70vh;
    border: 2px solid red;
`

export default function Banner() {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
        >
            <SwiperSlide><Slide>
                나와 가장 가까운 도서관의 인기도서는?</Slide></SwiperSlide>
            <SwiperSlide><Slide>유나님의 취향을 반영한 북,돋움만의 추천도서</Slide></SwiperSlide>
            <SwiperSlide><Slide>비로그인 사용자</Slide></SwiperSlide>
        </Swiper>

    );
}

