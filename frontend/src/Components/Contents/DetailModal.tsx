import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { XMarkIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import { getBookDetailAPI } from '../../apis/detail';
import { getReadWithAPI } from '../../apis/readwith';

interface Props {
    ISBN: number;
    modalOpen: boolean;
    closeModal: () => void;
}
interface ImgProps {
    imageUrl: any;
}

interface BookDetail {
    bookId: number;
    title: string;
    author: string;
    publisher: string;
    imageUrl: string;
    content: string;
    category: string[];
}

export default function DetailModal({ ISBN, modalOpen, closeModal }: Props) {
    const navigate = useNavigate();
    const [bookDetail, setBookDetail] = useState<BookDetail>();
    const [readWith, setReadWith] = useState<number>(0)

    useEffect(() => {
        // 도서 상세 조회 api
        getBookDetail()
    }, [])

    const getBookDetail = async () => {
        const data = await getBookDetailAPI(ISBN)
        if(data?.success) {
            setBookDetail(data?.responseData)
            getReadWith(data?.responseData.id)
        }
    }

    const getReadWith = async (bookId: number ) => {
        const data: any = await getReadWithAPI(bookId)
        setReadWith(data?.length)
    }

    return (
        <Container className={modalOpen ? 'open' : ''}>
            <Background />
            <Modal>
                <ModalTop>
                    <CloseBtn onClick={closeModal}>
                        <XMarkIcon width="25px" strokeWidth="1.5px" color="white" />
                    </CloseBtn>
                    <BookImage imageUrl={bookDetail?.imageUrl} />
                </ModalTop>
                <ModalBottom>
                    <Contents>
                        <People>
                            <div style={{ margin: '0 3% 0 0' }}>
                                <UsersIcon width="25px" />
                            </div>
                            <div >현재 이 책을 읽고 있는 사람  · {readWith}명</div>
                        </People>
                        <InfoTitle></InfoTitle>
                        <Title>제목</Title>
                        <Content>{bookDetail?.title}</Content>
                        <Title>저자</Title>
                        <Content>{bookDetail?.author}</Content>
                        <Title>출판사</Title>
                        <Content>{bookDetail?.publisher}</Content>
                        <Title>소개</Title>
                        <Content>{bookDetail?.content}</Content>
                        <Link onClick={() => navigate(`/library/${ISBN}`, { state: { title: bookDetail?.title } })}>도서관 정보 확인하기</Link>
                    </Contents>
                </ModalBottom>
            </Modal>
        </Container>
    );
}
const Container = styled.div`
    /* width: 100vw;
    height: 100vh; */
    display: none;
    &.open {
    display: block;
    }
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
    margin : auto;
    max-width: 33rem;
    background-color: white;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 5;
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
const BookImage = styled.div<ImgProps>`
    width: 130px;
    height: 195px;
    background-image: url(${(props: ImgProps) => props.imageUrl});
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