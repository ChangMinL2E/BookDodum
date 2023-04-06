import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// Components
import LibraryModal from "./LibraryModal";
// Types
import { LibraryType } from "../../Store/Types";
// APIs
import { getLibraryAPI, getRegionCodeAPI } from "../../apis/library";

interface Props {
  title : string;
}

export default function LibraryList({title} : Props) {
  const ISBN = useParams().ISBN;
  const [selectedLib, setSelectedLib] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [libs, setLibs] = useState<LibraryType[]>([]);
  const [position, setPosition] = useState<[number, number]>([-1, -1]);
  const [regionCode, setRegionCode] = useState<any>(-1);

  useEffect(() => {
    // 현재 좌표 구하기
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.longitude, position.coords.latitude]);
    });
  }, []);

  // 좌표로 지역코드 받아오기
  useEffect(() => {
    if (position[0] !== -1) {
      getRegionCode();
    }
  }, [position]);

  const getRegionCode = async () => {
    const data = await getRegionCodeAPI(position[0], position[1]);
    setRegionCode(data?.regionCode);
  };

  useEffect(() => {
    if (regionCode !== -1) {
      getLibrary();
    }
  }, [regionCode]);

  // 도서 소장 도서관 조회
  const getLibrary = async () => {
    const data = await getLibraryAPI(ISBN, regionCode);

    let tmp: LibraryType[] = [];
    data?.forEach((lib: any) => {
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
      });
    });
    setLibs(tmp);
  };

  // 모달 열고 닫기
  const openModal = (libCode: number) => {
    setModalOpen(true);
    setSelectedLib(libCode);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <>
        {" "}
        {libs?.map((lib) => {
          return (
            <Item key={lib.libCode}>
              <ItemName
                onClick={() => {
                  openModal(lib.libCode);
                }}
              >
                {lib.libName}
              </ItemName>
              <ItemDist>{lib.tel}</ItemDist>
            </Item>
          );
        })}
      </>
      {modalOpen && (
        <LibraryModal
        title={title}
          closeModal={closeModal}
          libCode={selectedLib}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 9% 0 9% 8%;
  border-bottom: 0.2px solid #bfbfbf;
`;

const ItemName = styled.div`
  font-weight: 400;
  color: #5c5649;
  font-size: 16px;
  margin-right: 3%;
`;

const ItemDist = styled.div`
  font-weight: 400;
  font-size: 13px;
  color: #c2bfbb;
`;
