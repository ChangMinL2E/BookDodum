import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import { CameraIcon } from "@heroicons/react/24/outline";

const Barcode = styled.div`
  z-index: 999;
  height: 35%;
  width: 95%;
  top: 30%;
  left: 1%;
  position: fixed;
  border: 4px solid #4a6eec;
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

const videoConstraints = {
  width: 360,
  height: 740,
  facingMode: "environment",
};

export const Isbn = () => {
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
      />
      <Barcode></Barcode>
      <Button onClick={capture}>
        <CameraIcon
          width="40px"
          strokeWidth="2px"
          color="#ffffff"
        ></CameraIcon>
      </Button>
      {url && (
        <>
          <div>
            <button
              onClick={() => {
                setUrl(null);
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
    </>
  );
};
