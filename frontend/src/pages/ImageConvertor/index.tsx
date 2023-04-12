import React, { useState, useEffect } from "react";
import Form from "./Form";
import Images from "./Images";
// APIs
import { getTextAPI } from "../../apis/translate";
import { changeImageAPI } from "../../apis/changeImage";

import ImageLoading from "../ImageConvertor/ImageLoading";

export default function ImageConvertor() {
  const [selectedOption, setSelectedOption] = useState<string>(""); // 그림 옵션 선택
  const [korean, setKorean] = useState<string>(""); // 번역할 문장
  const [imageUrls, setImageUrls] = useState<string[]>([]); // 변환된 이미지 url
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translated, setTranslated] = useState<string>("");

  // 변환하기 버튼 눌렀을 때
  const handleSubmit = async () => {
    if (selectedOption === "") {
      alert("화풍을 선택하세요.");
      return;
    }
    translateText();
  };

  // 번역 api
  const translateText = async () => {
    const data = await getTextAPI(korean);
    setTranslated(data);
  };

  useEffect(() => {
    if (translated !== "") {
      changeImage(translated + ` ${selectedOption}`);
    }
  }, [translated]);

  // 그림 변환 api
  const changeImage = async (result: string) => {
    setIsLoading(true);
    const data = await changeImageAPI(result);

    let tmp: string[] = [];
    data?.forEach((item: any) => {
      tmp.push(item.url);
    });
    setImageUrls(tmp);
  };

  
  setTimeout(() => {
    setIsLoading(false);
  }, 5000);


  return (
    <>
      <Form
        handleSubmit={handleSubmit}
        korean={korean}
        setKorean={setKorean}
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
      {isLoading ? <ImageLoading/> :  <Images imageUrls={imageUrls} /> }
    

    </>
  );
}
