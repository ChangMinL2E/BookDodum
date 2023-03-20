import React, { useEffect, useState } from "react";
import Nav from "../../Components/Common/Nav";
import Banner from "./Banner";
import BookList from "./BookList";
import Library from "./Library"
// import BestKeyword from "./BestKeyword";

export default function Home() {

  return (
    <>
    <Nav/>
    <Banner/>
    <BookList/>
    <Library/>
    {/* <BestKeyword/> */}
    </>
  );
}
