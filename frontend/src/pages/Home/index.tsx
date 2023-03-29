/* global kakao */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// Components
import Nav from "../../Components/Common/Nav";
import Banner from "./Banner";
import BookList from "./BookList";
import LibraryBooks from "./LibraryBooks"
import ReadingBooks from "../../Components/Contents/ReadingBooks";
import BestKeyword from "./BestKeyword";

export default function Home() {
  const token = window.localStorage.getItem('user')
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!token) navigate('/intro') 
  }, [])
  return (
    <div style={{ background: "white" }}>
      <Nav />
      <Banner />
      <ReadingBooks theme={'light'} />
      <BookList type={'user'}/>
      <BookList type={'contents'}/>
      <LibraryBooks />
      <BestKeyword />
    </div>
  );
}
