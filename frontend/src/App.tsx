import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Isbn } from "./pages/Isbn";
import RecommendList from "./pages/RecommendList/index";
import ImageConvertor from './pages/ImageConvertor'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/intro" element={<Intro />} /> */}
        <Route path="/list" element={<RecommendList />} />
        <Route path="/isbn" element={<Isbn />}/>
        <Route path="/image" element={<ImageConvertor/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
