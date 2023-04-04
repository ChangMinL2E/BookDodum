import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getBookExistAPI, getItemSrchAPI } from "../../apis/library";
import { LibInfo } from "../../Store/Types";

interface LibraryProps {
  modalOpen: boolean;
  closeModal: () => void;
  libCode: number;
}

export default function LibraryModal({
  modalOpen,
  closeModal,
  libCode,
}: LibraryProps) {
  const ISBN = useParams().ISBN;
  const [libInfo, setLibInfo] = useState<LibInfo>();
  const [exist, setExist] = useState<Boolean>(false);

  useEffect(() => {
    getItemSrch();
    getBookExist();
  }, []);

  // 도서관별 장서/대출 데이터 조회
  const getItemSrch = async () => {
    const data = await getItemSrchAPI(ISBN, libCode);

    let tmp: LibInfo = {
      bookName:
        data.bookname.length > 15
          ? data.bookname.slice(0, 15) + "..."
          : data.bookname,
      classNum: data.class_no,
      bookCode: data.callNumbers[0].callNumber["book_code"],
      locName: data.callNumbers[0].callNumber["shelf_loc_name"],
    };
    setLibInfo(tmp);
  };

  // 도서관별 도서 소장여부 및 대출 가능여부 조회
  const getBookExist = async () => {
    const res = await getBookExistAPI(ISBN, libCode);
    if (res === "Y") setExist(true);
  };

  return (
    <Container>
      <BackGround />
      <Modal>
        <CloseBtn onClick={closeModal}>
          <XMarkIcon width="23px" strokeWidth="1.5px" color="#5c5649" />
        </CloseBtn>
        <ModalBottom>
          <TitleWrap>
            <Possible>
              {exist ? <div>대출가능</div> : <div>대출중</div>}
            </Possible>
            <Title>{libInfo?.bookName}</Title>
          </TitleWrap>
          <Mini>청구기호</Mini>
          <Contents>
            {libInfo?.classNum} - {libInfo?.bookCode}
          </Contents>
          <Mini>위치</Mini>
          <Contents>{libInfo?.locName}</Contents>
        </ModalBottom>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const BackGround = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 60%;
`;

const Modal = styled.div`
  width: 80%;
  height: 32%;
  border-radius: 3px;
  background-color: #f7f3eb;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 4%;
  right: 3%;
`;

const ModalBottom = styled.div`
  width: 85%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 3% 0 7% 0;
`;
const Possible = styled.div`
  background-color: #5c5649;
  color: white;
  border-radius: 5px;
  font-size: 11px;
  padding: 1.5% 4%;
  margin-right: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  color: #5c5649;
  font-size: 13px;
`;

const Mini = styled.div`
  color: #5c5649;
  font-size: 8px;
`;
const Contents = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin: 2% 0 9% 0;
`;
