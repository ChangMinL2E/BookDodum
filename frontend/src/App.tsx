import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Reader } from "./pages/Reader";
import ReaderTest from "./pages/ReaderTest";

import RecommendList from "./pages/RecommendList/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<RecommendList />} />
        <Route path="/reader" element={<Reader />} />
        <Route path='/readertest' element={<ReaderTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
