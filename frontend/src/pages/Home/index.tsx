/* global kakao */
import React, { useEffect, useState } from 'react'
import Nav from "../../Components/Common/Nav";
import Banner from "./Banner";
import BookList from "./BookList";
import LibraryBooks from "./LibraryBooks"
import ReadingBooks from "./ReadingBooks";
import BestKeyword from "./BestKeyword";

export default function Home() {
  return (
    <div style={{ background: "white" }}>
      <Nav />
      <Banner />
      <ReadingBooks theme={'light'} />
      <BookList />
      <LibraryBooks />
      <BestKeyword />
    </div>
  );
}
