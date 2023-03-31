import React, { useEffect } from 'react';
import styled from 'styled-components';
import useSelectorTyped from '../../Store';
import sample from '../../Assets/Images/sample.png'
import bookside from '../../Assets/Images/bookside.png';
import booktop from '../../Assets/Images/booktop.png';
import { getContentsRecommendAPI } from '../../apis/recommend';

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

export default function Recommend() {
    const nickname = useSelectorTyped((state) => state.user.name)
    const userId = useSelectorTyped((state) => state.user.userid)

    useEffect(() => {
        getConentsRecommend()
    }, [])

    const getConentsRecommend = async () => {
        const data = await getContentsRecommendAPI(userId);

    }

    return (
        <Container>
            <Title>{nickname}님을 위한<br></br>추천도서</Title>
            <Tags>#취향분석 #맞춤추천</Tags>
            <Contents>
                <SwiperWrap>
                    <Swiper style={{ height: '100%' }}
                        direction={"vertical"}
                        pagination={{
                            clickable: true,
                          }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <BookInfo>
                                <Book>
                                    <Top></Top>
                                    <Side></Side>
                                    <Front></Front>
                                </Book>
                                <Info>
                                    <BookTitle>불편한 편의점</BookTitle>
                                    <Categories>
                                        <Category>국내도서</Category>
                                        <Category>소설/시/희곡</Category>
                                    </Categories>
                                    <InfoBottom>
                                        <Author>글: 김유나</Author>
                                        <Publisher>출판사: 나무옆의자</Publisher>
                                    </InfoBottom>
                                </Info>
                            </BookInfo>
                        </SwiperSlide>
                        <SwiperSlide>
                            <BookInfo>
                                <Book>
                                    <Top></Top>
                                    <Side></Side>
                                    <Front></Front>
                                </Book>
                                <Info>
                                    <BookTitle>불편한 편의점</BookTitle>
                                    <Categories>
                                        <Category>국내도서</Category>
                                        <Category>소설/시/희곡</Category>
                                    </Categories>
                                    <InfoBottom>
                                        <Author>글: 김유나</Author>
                                        <Publisher>출판사: 나무옆의자</Publisher>
                                    </InfoBottom>
                                </Info>
                            </BookInfo>
                        </SwiperSlide> <SwiperSlide>
                            <BookInfo>
                                <Book>
                                    <Top></Top>
                                    <Side></Side>
                                    <Front></Front>
                                </Book>
                                <Info>
                                    <BookTitle>불편한 편의점</BookTitle>
                                    <Categories>
                                        <Category>국내도서</Category>
                                        <Category>소설/시/희곡</Category>
                                    </Categories>
                                    <InfoBottom>
                                        <Author>글: 김유나</Author>
                                        <Publisher>출판사: 나무옆의자</Publisher>
                                    </InfoBottom>
                                </Info>
                            </BookInfo>
                        </SwiperSlide>
                    </Swiper>
                </SwiperWrap>
                {/* <svg width="24" height="53" viewBox="0 0 24 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5 34.25L12 41.75L4.5 34.25M19.5 40.25L12 47.75L4.5 40.25" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4.5 12.75L12 5.25L19.5 12.75M4.5 18.75L12 11.25L19.5 18.75" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg> */}

            </Contents>
        </Container>
    );
}

const Container = styled.div`
    width : 100%;
    height: 600px;
    background-color: #E3E3CF;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.div`
    font-family: 'Gowun Dodum', sans-serif;
    font-weight: 800;
    font-size: 25px;
    text-align: center;
    margin : 10% auto 4% auto;
`

const Tags = styled.div`
    font-family: 'Nanum Gothic Coding', monospace;
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 3%;
    font-style: italic;
`

const Contents = styled.div`
    width : 90%;
    height: 69%;
    margin : 5% 0 5% 0;
    border-radius: 200px 200px 0 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SwiperWrap = styled.div`
    margin: auto;
    width: 100%;
    height: 100%;
`

const BookInfo = styled.div`
    margin: auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Book = styled.div`
   margin: 6% 0 0 0;
   transform-style: preserve-3d;
   transform: rotateX(20deg) rotateY(20deg);
   height: 270px;
   width : 180px;
   > div {
    position: absolute;
   }
`
const Top = styled.div`
    transform: rotateX(90deg) translateZ(18px) translateX(-7px) translateY(45px);
    width: 180px;
    height: 50px;
    background-image: url(${booktop});
    background-size: cover;
`

const Side = styled.div`
    width: 50px;
    height: 270px;
    background-image: url(${bookside});
    background-size: cover;
    transform: rotateY(90deg) translateZ(346px) translateX(500px) translateY(-205px);
`
const Front = styled.div`
    width : 180px;
    height : 270px;
    background-size: cover;
    background-image: url(${sample});
`

const Info = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin : 2% 0 0 0;
`

const BookTitle = styled.div`
    font-size: 19px;
    margin : 4% 0 3% 0;
    font-family: 'Nanum Gothic Coding', monospace;
    font-weight: bold;
    color : #65625E;
`
const Categories = styled.div`
    display: flex;
    justify-content: center;
    width : 100%;
`

const Category = styled.div`
    padding : 0.5% 2%;
    font-size: 13px;
    margin: 0 1%;
    border: 1px solid black;
    height: 20px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const InfoBottom = styled.div`
    display: flex;
    font-size: 12px;
    color: #6c6c6c;
    width: 100%;
    justify-content: center;
    > div {
        margin : 3% 2%;
    }
`
const Author = styled.div`

`
const Publisher = styled.div``