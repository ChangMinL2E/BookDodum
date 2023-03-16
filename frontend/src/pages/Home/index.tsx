import React, { useState } from "react";
// import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const books: string[] = ["어린왕자", "모순"];
  const navigate = useNavigate();
  
  return (
    <>
      <div>지우님이 읽고 있는 책</div>
      <div>
        {books.map((book, idx) => {
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
