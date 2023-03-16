import React, { useEffect, useState } from "react";
// import Card from "./Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ListFormat } from "typescript";

interface BestType {
  id: number;
  title: string;
  author: string;
  publisher: string;
  image_url: string;
  isbn: number;
  category: ListFormat;
}

interface SimilarType {
  id: number;
  title: string;
  author: string;
  publisher: string;
  image_url: string;
  isbn: number;
  category: ListFormat;
}

export default function Home() {
  const [bestBooks, setBestBooks] = useState<BestType[]>([]);
  const [similarBooks, setSimilarBooks] = useState<SimilarType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 상품 정보 axios
    axios
      .get(`http://127.0.0.1:8000/books/popular/`)
      .then((res) => {
        var list: BestType[] = [];

        res.data.forEach((item: any) => {
          list.push({
            id: item.id,
            title: item.title,
            author: item.author,
            publisher: item.publisher,
            image_url: item.image_url,
            isbn: item.isbn,
            category: item.category,
          });
        });
        setBestBooks(list);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get(`http://127.0.0.1:8000/books/similar/9788950922382`)
      .then((res) => {
        var list: SimilarType[] = [];

        res.data.forEach((item: any) => {
          list.push({
            id: item.id,
            title: item.title,
            author: item.author,
            publisher: item.publisher,
            image_url: item.image_url,
            isbn: item.isbn,
            category: item.category,
          });
        });

        setSimilarBooks(list);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (
    <>
      <h3>베스트셀러 Top20</h3>
      <div>
        {bestBooks.map((book) => 
          <div key={book.id}>{book.title}</div>
        )}
      </div>
      
      <h3>유사한 책 추천</h3>
      <div>
        {similarBooks.map((book) => 
          <div key={book.id}>{book.title}</div>
        )}
      </div>
      <button
        onClick={() => {
          navigate("/reader");
        }}
      >
        책 추가하기
      </button>
    </>
  );
}
