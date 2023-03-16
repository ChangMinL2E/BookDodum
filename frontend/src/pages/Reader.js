import React, { useState, useCallback, useMemo } from "react";

import ImageCapture from "react-image-data-capture";

const App = () => {
  const [showImgCapture, setShowImgCapture] = useState(true);
  const config = useMemo(() => ({ video: true }), []);
  const url = "back api";
  /*
    { video: true } - Default Camera View
    { video: { facingMode: environment } } - Back Camera
    { video: { facingMode: "user" } } - Front Camera
  */
  const [imgSrc, setImgSrc] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const onCapture = (imageData) => {
    setImgSrc(imageData.webP);
    setImgFile(imageData.file);
    // Unmount component to stop the video track and release camera
    setShowImgCapture(false);
  };

  fetch(url, {
    method: "POST",
    body: formData
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log(data);
    });

  const onError = useCallback((error) => {
    console.log(error);
  }, []);

  // imgFile can be used as a file upload form submission
  const formData = new FormData();
  formData.append("file", imgFile);

  return (
    <>
      {showImgCapture && (
        <ImageCapture
          onCapture={onCapture}
          onError={onError}
          width={500}
          userMediaConfig={config}
        />
      )}
      {imgSrc && (
        <div>
          <div>Captured Image:</div>
          <img src={imgSrc} alt="captured-img" />
          <div>{JSON.stringify(imgFile)}</div>
        </div>
      )}
    </>
  );
};

export default App;
