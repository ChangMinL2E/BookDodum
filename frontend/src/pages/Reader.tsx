import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "environment",
};

export const Reader = () => {
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
      <header>
        <h1>바코드 인식</h1>
      </header>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>capture</button>
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
