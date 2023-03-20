import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { CameraIcon } from "@heroicons/react/24/outline";
import Check from "./Check";
import { useNavigate } from "react-router-dom";
import { getBookInfo, postBookId } from "../../apis/isbn";

// booktype 필요

const videoConstraints = {
  width: 360,
  height: 740,
  // facingMode: "environment",
  facingMode: "user",
};

export const Isbn = () => {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const clickNoBtn = () => {
    setTitle("");
  };

  const clickYesBtn = () => {
    bookCheck();
    alert("등록되었습니다.");
    navigate("/");
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  const bookInfo = async () => {
    await getBookInfo(url);
  };

  const bookCheck = async () => {
    // await postBookId(bookInfo.id);
  };

  useEffect(() => {
    // setTitle(bookInfo.title);
  }, [bookInfo]);

  return (
    <div>
      {!title ? (
        <Cam>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
          />
          <Barcode>
            <BarcodeBox />
            <BarcodeText>
              도서 바코드를 사각형 안에 맞추고
              <br />
              사진을 찍어 책을 등록하세요!
            </BarcodeText>
          </Barcode>
          <Button
            onClick={() => {
              // capture;
              bookInfo();
            }}
          >
            <Camera>
              <CameraIcon
                width="40px"
                strokeWidth="1.5px"
                color="#ffffff"
              ></CameraIcon>
            </Camera>
          </Button>
          {/* 없애야할 부분 */}
          {url && (
            <>
              <div>
                <button
                  onClick={() => {
                    setUrl("");
                  }}
                >
                  delete
                </button>
              </div>
              <div>
                <img src={url} alt="Screenshot" />
                <div>{url}</div>
              </div>
            </>
          )}
        </Cam>
      ) : (
        <Check
          title={title}
          clickNoBtn={clickNoBtn}
          clickYesBtn={clickYesBtn}
        />
      )}
    </div>
  );
};

// styled component
const Cam = styled.div``;

const Barcode = styled.div`
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BarcodeBox = styled.div`
  height: 35%;
  width: 95%;
  top: 20%;
  position: fixed;
  border: 4px solid black;
`;

const BarcodeText = styled.div`
  text-align: center;
  top: 58%;
  position: fixed;
  font-weight: bold;
`;

const Button = styled.div`
  z-index: 999;
  border-radius: 100px;
  height: 80px;
  width: 80px;
  background-color: black;
  top: 83%;
  left: 40%;
  position: fixed;
`;

const Camera = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
