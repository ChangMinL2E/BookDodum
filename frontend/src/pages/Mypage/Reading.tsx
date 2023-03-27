import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSelectorTyped from "../../Store";
import { getReadingAPI } from "../../apis/Readingbook";
import { Book } from "../../Store/Types";
import BookCover from "../../Components/Contents/BookCover";


export default function Reading() {
    const [books,setBooks] =  useState<Book[]>([]);
  const nickname = useSelectorTyped((state) => state.user.name);

useEffect (() => {
    getReading()
},[])

const getReading = async () => {
    const data = await getReadingAPI();
    setBooks(data);
}



  return (
    <>
      <ReadingText>{nickname}님이 읽고있는 책</ReadingText>
   
    
    </>
  );
}



const ReadingText = styled.span`
  color: #f9f9f7;
  padding-top: 3%;
  margin-left: 5%;
  size: 13px;
`;
