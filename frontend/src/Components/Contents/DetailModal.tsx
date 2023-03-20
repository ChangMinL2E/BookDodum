import React, { useEffect } from 'react';
import styled from 'styled-components';
import { XMarkIcon, UsersIcon } from '@heroicons/react/24/outline'
import sample from '../../Assets/Images/sample.png';

interface Props {
    bookId: number
}

export default function DetailModal({ bookId }: Props) {

    useEffect(() => {
        // 도서 상세 조회 api
    })

    return (
        <Container>
            <Background />
            <Modal>
                <ModalTop>
                    <CloseBtn>
                        <XMarkIcon width="25px" strokeWidth="1.5px" color="white" />
                    </CloseBtn>
                    <BookImage />
                </ModalTop>
                <ModalBottom>
                    <Contents>
                        <People>
                            <div style={{ margin: '0 3% 0 0' }}>
                                <UsersIcon width="25px" />
                            </div>
                            <div >현재 이 책을 읽고 있는 사람  · 14명</div>
                        </People>
                        <InfoTitle></InfoTitle>
                        <Title>제목</Title>
                        <Content>불편한 편의점</Content>
                        <Title>저자</Title>
                        <Content>김호연</Content>
                        <Title>출판사</Title>
                        <Content>나무 옆 의자</Content>
                        <Title>소개</Title>
                        <Content>새로 온 알바는 커다란 덩치와 부담스러운 행동이 누군가를 연상시키는 40대 사내. 그는 인간 알바몬이라도 되는 양 화려한 알바 경력을 자랑하지만 정작 편의점 일은 어수룩하기만 하다. 게다가 수다쟁이에 오지랖은 못 말릴 지경이어서 점장 선숙에게 핀잔을 뜯기 일쑤다. 그러거나 말거나 그는 황근배라는 이름 대신 홍금보라는 별명이 적힌 명찰을 가슴에 달고 마냥 느긋하게 손님들을 맞으며 편의점의 밤을 지켜 나간다.</Content>
                        <Link>도서관 정보 확인하기</Link>
                    </Contents>
                </ModalBottom>
            </Modal>
        </Container>
    );
}
const Container = styled.div`
    
`
const Background = styled.div`
    position: fixed;
    top:0;
    left:0;
    background-color: black;
    opacity: 50%;
    width: 100vw;
    height: 100%;
    z-index: 2;
`

const Modal = styled.div`
    width: 95%;
    background-color: white;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 3;
`

const ModalTop = styled.div`
    height: 250px;
    width:100%;
    background-color: #5C5649;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const CloseBtn = styled.div`
    position: absolute;
    top: 1%;
    right: 2%;
`
const BookImage = styled.div`
    width: 130px;
    height: 195px;
    background-image: url(${sample});
    background-size: cover;
`

const ModalBottom = styled.div`
`
const Contents = styled.div`
    width: 85%;
    margin: 10% auto;
`
const People = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #5C5649;
    font-weight: bold;
`
const InfoTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #5C5649;
`
const Title = styled.div`
    color : #5C5649;
    font-size: 14px;
    margin: 4% 0;
`

const Content = styled.div`
    font-size: 14px;
    margin: 5% 0 10% 0;
`

const Link = styled.div`
    font-size: 16px;
    color: #4A6EEC;
`