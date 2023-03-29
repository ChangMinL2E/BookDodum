import React, { useState } from "react";
import styled from "styled-components";
import banner1 from "../../Assets/Images/banner1.png";
import banner2 from "../../Assets/Images/banner2.png";
import banner3 from "../../Assets/Images/banner3.png";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import { useNavigate } from "react-router-dom";


export default function Banner() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false)

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      loop={true}
    >
      <SwiperSlide>
        <Slide1>
          <Link1>
            <Text>내 취향 분석 도서 보러가기</Text>
            <ArrowRightCircleIcon width="20px" color="white" />
          </Link1>
        </Slide1>
      </SwiperSlide>
      <SwiperSlide>
        <Slide2>
          <Link2>
            <Text>광주 도서관의 인기 도서 보러가기</Text>
            <ArrowRightCircleIcon width="20px" color="white" />
          </Link2>
        </Slide2>
      </SwiperSlide>
      {
        !isLogin &&
        <SwiperSlide>
          <Slide3>
            <Link3>
              <Text onClick={() => navigate('/signup')}>지금 시작하기</Text>
              <ArrowRightCircleIcon width="20px" color="white" />
            </Link3>
          </Slide3>
        </SwiperSlide>
      }
    </Swiper>
  );
}


const Slide1 = styled.div`
  width: 100%;
  height: 80vh;
  background: url(${banner1});
  background-size: cover;
  background-position: center;
`;

const Link1 = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 8%;
  width: 100%;
  justify-content: center;
`;

const Text = styled.div`
  color: white;
  font-size: 16px;
  margin-right: 5px;
`;

const Slide2 = styled.div`
 width: 100%;
  height: 80vh;
  background: url(${banner2});
  background-size: cover;
  background-position: center;
`;

const Link2 = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 8%;
  width: 95%;
  justify-content: flex-end;
  margin-right: 5%;
`;

const Slide3 = styled.div`
 width: 100%;
  height: 80vh;
  background: url(${banner3});
  background-size: cover;
  background-position: center;
`;

const Link3 = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 13%;
  width: 90%;
  justify-content: flex-start;
  margin-left: 9%;
`