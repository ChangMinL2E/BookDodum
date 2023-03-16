import React, { useEffect, useState } from "react";
// import Card from "./Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const bestBooks: string[] = [];
  const [similarBooks, setSimilarBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 상품 정보 axios
    axios
      .get(`http://127.0.0.1:8000/books/popular/`)
      .then((res) => {
        // setSimilarBooks(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>베스트셀러 Top20</div>
      <div>
        {bestBooks.map((book, idx) => {
          return (
            <div key={idx}>
              <h3>{book}</h3>
            </div>
          );
        })}
      </div>
      <div>유사한 책 추천</div>
      <div>
        {similarBooks.map((book, idx) => {
          return (
            <div key={idx}>
              <h3>{book}</h3>
            </div>
          );
        })}
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
