import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reader from "./pages/Reader.js";
import Home from "./pages/Home";
import {ReaderTest} from "./pages/ReaderTest";
import RecommendList from "./pages/RecommendList/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<RecommendList />} />
        <Route path="/reader" element={<Reader />} />
        <Route path="/readertest" element={<ReaderTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
