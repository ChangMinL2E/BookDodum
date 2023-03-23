import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { LibraryType } from '../../Store/Types';
import { getLibraryAPI } from '../../apis/library';
import LibraryModal from './LibraryModal';

export default function LibraryList() {
    const ISBN = useParams().ISBN

    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [libs, setLibs] = useState<LibraryType[]>([])
    const regionCode = 24

    useEffect(() => {
        // 도서 소장 도서관 조회
        // getLibrary()
    }, [])

    const getLibrary = async () => {
        const data = await getLibraryAPI(ISBN, regionCode)

        let tmp: LibraryType[] = []
        data.forEach((lib: any) => {
            tmp.push({
                libCode: Number(lib.lib.libCode),
                libName: lib.lib.libName,
                address: lib.lib.address,
                latitude: Number(lib.lib.latitude),
                longitude: Number(lib.lib.longitude),
                homepage: lib.lib.homepage,
                closed: lib.lib.closed,
                operatingTime: lib.lib.operatingTime,
                tel: lib.lib.tel,
            })
        })
        setLibs(tmp)
    }

    const openModal = () => {
        setModalOpen(true)
        console.log(modalOpen)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <Container>
            <> {
                libs?.map((lib) => {
                    return (
                        <Item key={lib.libCode}>
                            <ItemName onClick={openModal}>{lib.libName}</ItemName>
                            <ItemDist> · 거리 6.8km</ItemDist>
                        </Item>
                    )
                })
            }
            </>
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

