import React, { useEffect, useState } from "react";
import Nav from "../../Components/Common/Nav";
import DetailModal from "../../Components/Contents/DetailModal";
import Banner from "./Banner";
import BookList from "./BookList";
import Library from "./Library"
import sample from '../../Assets/Images/sample.png'
// import BestKeyword from "./BestKeyword";

export default function Home() {

  return (
    <>
    <Nav/>
    <Banner/>
    <BookList/>
    <Library/>
    <DetailModal bookId={1}/>
    {/* <BestKeyword/> */}
    </>
  );
}
