import React from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper";



// Styled Components
const Container = styled.div`
  width : 100%;
  height: 550px;
  background-color: #F9F9F7;
`
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

const Desc = styled.div`
  margin-top: 5%;
  font-size: 12px;
  color: #5c5c5c;
  text-align: center;
`;

// Type
type Props = {
  // 도서관 추천 리스트
};

// Component
const Library: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Title>
        가장 가까운 도서관의
        <br />
        인기 대출 도서
      </Title>
      <Desc>""의 인기 도서를 만나보세요!</Desc>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        <SwiperSlide>
          슬라이드
        </SwiperSlide>
        <SwiperSlide>
          슬라이드
        </SwiperSlide>
        <SwiperSlide>
          슬라이드
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default Library;
