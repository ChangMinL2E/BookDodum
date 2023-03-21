import React, { useEffect, useState } from "react";
import Nav from "../../Components/Common/Nav";
import DetailModal from "../../Components/Contents/DetailModal";
import Banner from "./Banner";
import BookList from "./BookList";
import LibraryBooks from "./LibraryBooks"
import sample from '../../Assets/Images/sample.png'
import ReadingBooks from "./ReadingBooks";
// import BestKeyword from "./BestKeyword";

export default function Home() {

  return (
    <>
    <Nav/>
    <Banner/>
    <ReadingBooks/>
    <BookList/>
    <LibraryBooks/>
    {/* <DetailModal bookId={1}/> */}
    {/* <BestKeyword/> */}
    </>
  );
}
