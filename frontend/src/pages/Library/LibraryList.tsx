import React, { useState } from 'react';
import styled from 'styled-components';
import LibraryModal from './LibraryModal';

export default function LibraryList() {
    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const openModal = () => {
        setModalOpen(true)
        console.log(modalOpen)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <Container>
            <Item>
                <ItemName onClick={openModal}>광주북구운암도서관</ItemName>
                <ItemDist> · 거리 6.8km</ItemDist>
            </Item>
            <Item>
                <ItemName>광주송정도서관</ItemName>
                <ItemDist> · 거리 6.8km</ItemDist>
            </Item>
            <Item>
                <ItemName>광주북구일곡도서관</ItemName>
                <ItemDist> · 거리 7.6km</ItemDist>
            </Item>
            {modalOpen &&
                <LibraryModal modalOpen={modalOpen} closeModal={closeModal} />
            }
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    padding: 9% 0 9% 8%;
    border-bottom: 0.2px solid #BFBFBF;
`

const ItemName = styled.div`
    font-weight: 400;
    color: #5c5649;
    font-size: 16px;
    margin-right: 3%;
`

const ItemDist = styled.div`
font-weight: 400;
font-size: 13px;
color: #c2bfbb;
`

