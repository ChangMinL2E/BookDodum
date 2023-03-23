import React from 'react';
import styled from 'styled-components';
import { XMarkIcon } from '@heroicons/react/24/outline'

interface LibraryProps {
    modalOpen: boolean;
    closeModal: () => void;
}

export default function LibraryModal({ modalOpen, closeModal }: LibraryProps) {
    return (
        <Container>
            <BackGround />
            <Modal>
                <CloseBtn onClick={closeModal}>
                    <XMarkIcon width="23px" strokeWidth="1.5px" color="#5c5649" />
                </CloseBtn>
                <ModalBottom>
                    <TitleWrap>
                        <Possible><div>대출가능</div></Possible>
                        <Title>불편한 편의점</Title>
                    </TitleWrap>
                    <Mini>청구기호</Mini>
                    <Contents>470.4-밀294ㅁ</Contents>
                    <Mini>위치</Mini>
                    <Contents>광주북구운암도서관</Contents>
                </ModalBottom>
            </Modal>
        </Container>
    );
}


const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

const BackGround = styled.div`
  position: fixed;
  top : 0;
  z-index: 3;
  width : 100vw;
  height: 100vh;
  background-color: black;
  opacity: 60%;
`

const Modal = styled.div`
    width: 80%;
    height: 32%;
    border-radius: 3px;
    background-color: #F7F3EB;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const CloseBtn = styled.div`
    position: absolute;
    top: 4%;
    right: 3%;
`

const ModalBottom = styled.div`
    width: 85%;
    margin: auto;
    display: flex;
    flex-direction: column;
`

const TitleWrap = styled.div`
    display: flex;
    align-items: center;
    margin: 3% 0 7% 0;
`
const Possible = styled.div`
    background-color: #5c5649;
    color:white;
    border-radius: 5px;
    font-size: 11px;
    padding: 1.5% 4%;
    margin-right:4%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Title = styled.div`
    color: #5c5649;
    font-size: 13px;
`

const Mini = styled.div`
    color: #5c5649;
    font-size: 8px;
`
const Contents = styled.div`
    font-size: 18px;
    font-weight: 500;
    margin: 2% 0 9% 0;
`