import React, { useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import ImagePreview from "./ImagePreview"; // source code : ./src/demo/AppWithImagePreview/ImagePreview

function ReaderTest(props) {
  const [dataUri, setDataUri] = useState("");

  function handleTakePhotoAnimationDone(dataUri) {
    console.log("takePhoto");
    setDataUri(dataUri);
  }

  const constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 1920 },
      height: { ideal: 1080 },
      focusMode: "auto",
      focusDistance: 0.1 // 초점 거리를 0.1로 설정합니다.
    }
  };

  navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    // MediaStream을 처리합니다.
  });

  const isFullscreen = false;
  return (
    <div>
      {dataUri ? (
        <ImagePreview dataUri={dataUri} isFullscreen={isFullscreen} />
      ) : (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isMaxResolution={true}
          idealVideoConstraints={constraints}
        />
      )}
    </div>
  );
}

export default ReaderTest;
