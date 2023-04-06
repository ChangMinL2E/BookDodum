import React, { useState, createRef, useRef, useEffect, useCallback, Fragment } from 'react';

var imageContainer = {
  position: 'relative',
  display: 'inline-block'
};
var imageCanvas = {
  display: 'none'
};
var captureBtn = {
  border: '1px solid white',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  background: '#f7473587',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer'
};

function ImageCapture(props) {
  var onCapture = props.onCapture,
      onError = props.onError,
      width = props.width,
      userMediaConfig = props.userMediaConfig;

  var _useState = useState(false),
      streaming = _useState[0],
      setStreaming = _useState[1];

  var playerRef = createRef();
  var canvasRef = createRef();
  var tracks = useRef();
  useEffect(function () {
    var timeout;
    navigator.mediaDevices.getUserMedia(userMediaConfig).then(function (stream) {
      playerRef.current.srcObject = stream;
      tracks.current = stream.getTracks();
      timeout = setTimeout(function () {
        return setStreaming(true);
      }, 2000);
    })["catch"](function (error) {
      if (onError) onError(error);
    });
    return function () {
      if (timeout) clearTimeout(timeout);
    };
  }, [onError, userMediaConfig]);
  useEffect(function () {
    return function () {
      if (tracks.current) {
        tracks.current[0].stop();
      }
    };
  }, []);
  var captureImage = useCallback(function () {
    var imageWidth = playerRef.current.offsetWidth;
    var imageHeight = playerRef.current.offsetHeight;
    var _ref = [imageWidth, imageHeight];
    canvasRef.current.width = _ref[0];
    canvasRef.current.height = _ref[1];
    var context = canvasRef.current.getContext('2d');
    context.drawImage(playerRef.current, 0, 0, imageWidth, imageHeight);

    if (onCapture) {
      var webPData = canvasRef.current.toDataURL('image/webp');
      canvasRef.current.toBlob(function (blob) {
        onCapture({
          blob: blob,
          webP: webPData,
          file: new File([webPData], new Date().getTime() + ".png")
        });
      });
    }
  }, [onCapture, canvasRef, playerRef]);
  return /*#__PURE__*/React.createElement("div", {
    style: imageContainer
  }, /*#__PURE__*/React.createElement("video", {
    ref: playerRef,
    autoPlay: true,
    width: width
  }), streaming && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: captureBtn,
    onClick: captureImage
  }), /*#__PURE__*/React.createElement("canvas", {
    style: imageCanvas,
    ref: canvasRef
  })));
}

export default ImageCapture;
//# sourceMappingURL=index.modern.js.map
