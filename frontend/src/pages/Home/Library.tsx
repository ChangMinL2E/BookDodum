import React from "react";
import styled from "styled-components";
import sample from '../../Assets/Images/sample.png'

// import Components
import Book from "../../Components/Contents/Book";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow } from "swiper";
import BookCover from "../../Components/Contents/BookCover";


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
      <Desc>"광주북구운암도서관"의 인기 도서를 만나보세요!</Desc>
      <SwiperWrap>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        modules={[EffectCoverflow]}
        >
        <SwiperSlide>
          <BookCover imageUrl={sample} size={170}/>
        </SwiperSlide>
        <SwiperSlide>
          <BookCover imageUrl={sample} size={170}/>
        </SwiperSlide>
        <SwiperSlide>
          <BookCover imageUrl={sample} size={170}/>
        </SwiperSlide>
      </Swiper>
        </SwiperWrap>
    </Container>
  );
};

export default Library;

// Styled Components
const Container = styled.div`
  width : 100%;
  height: 550px;
  background-color: #F9F9F7;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin: 3% 0; 
`;

const Desc = styled.div`
  margin-top: 8%;
  font-size: 12px;
  color: #5c5c5c;
  text-align: center;
`;

const SwiperWrap = styled.div`
  margin-top: 15%;
`
