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
import { getReadingBooksAPI } from '../../apis/reading';
import { BookInfo } from '../../Store/Types';

export default function Home() {
  const token = window.localStorage.getItem('user')
  const navigate = useNavigate();

  const [reading, setReading] = useState<BookInfo[]>([]);
  
  useEffect(() => {
    if(!token) navigate('/intro') 
    getReadingBooks()
  }, [])

  const getReadingBooks = async () => {
    const data = await getReadingBooksAPI();
    setReading(data)
  }


  return (
    <div style={{ background: "white" }}>
      <Nav />
      <Banner />
      <ReadingBooks theme={'light'} />
      {
        reading.map((book) => {
          return (
            <BookList key={book.bookId} type={'user'} bookId={book.bookId}/>
          )
        })
      }
      <BookList type={'contents'} bookId={-1}/>
      <LibraryBooks />
      <BestKeyword />
    </div>
  );
}
