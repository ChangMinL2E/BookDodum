import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ImageAI from "../../Components/Contents/ImageAI";
import { saveImageAPI } from "../../apis/saveImage";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { postBookIdAPI } from "../../apis/isbn";


interface Props {
  imageUrls: string[];
  bookid?: number;
}

// axios 요청할 데이터 타입
interface ImageProps {
  bookId: number;
  convertedImageUrl: string;
}

export default function Images({ imageUrls }: Props) {
  const bookId = useParams().bookid;
  const navigate = useNavigate();

  // 선택할 인덱스
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>("");
  //클릭 시 인덱스 업데이트
  const handleChange = (idx: number) => {
    setSelectedIdx(idx);
  };

  useEffect(() => {
    setSelectedImage(imageUrls[selectedIdx]);
  }, [selectedIdx]);

  const Image: ImageProps = {
    bookId: Number(bookId),
    convertedImageUrl: selectedImage,
  };

  const submitImage = async () => {

    await saveImageAPI(Image);
    navigate("/mypage");
  };


  return (
    <Container>
      <Contents> 
            <Minis>
            {/* for문 돌려 */}
            {imageUrls?.map((image, idx) => (
              <div
              style={{ margin: "5% 1%" }}
              onClick={() => handleChange(idx)}
              >
                <ImageAI
                  key={idx}
                  imageUrl={image}
                  size="60px"
                  name={selectedIdx === idx ? "select" : ""}
                  />
              </div>
            ))}
          </Minis>

        {/* 선택된 사진 업데이트 */}
        <Selected>
          <ImageAI imageUrl={imageUrls[selectedIdx]} size="250px" />
        </Selected>
      </Contents>
      <ButtonContainer>
        <Button
          onClick={() => {
            submitImage();
            navigate("/mypage")
          }}
        >
          확인
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: auto;
  margin: 7% auto;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Minis = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const Selected = styled.div`
  /* border: 2px solid blue; */
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
`;

const Button = styled.button`
  border: none;
  box-shadow: rgba(97, 88, 88, 0.25) 0px 4px 1px;
  background-color: #dbd4c3;
  height: 50px;
  width: 100%;
  color: #5c5649;
  font-weight: bold;
  .active {
  }
`;
