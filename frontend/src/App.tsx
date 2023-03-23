import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Isbn } from "./pages/Isbn";
import RecommendList from "./pages/RecommendList/index";
import Mypage from "./pages/Mypage/Index";
import ReadingBooks from './pages/ReadingBooks'
import ImageConvertor from './pages/ImageConvertor'
import Group from "./pages/Group";
import GroupRoom from "./pages/GroupRoom";
import Library from "./pages/Library";
import Intro from "./pages/Intro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/list" element={<RecommendList />} />
        <Route path="/library/:ISBN" element={<Library />} />
        <Route path="/isbn" element={<Isbn />}/>
        <Route path="/image" element={<ImageConvertor/>} />
        <Route path = "/mypage" element={<Mypage/>} />
        <Route path = '/reading' element = {<ReadingBooks/>} />
        <Route path="/bookgroup" element={<Group />} />
        <Route path="/bookgroup/:groupid" element={<GroupRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
