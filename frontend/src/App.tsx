import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Isbn } from "./pages/Isbn";
import Check from "./pages/Isbn/Check";
import RecommendList from "./pages/RecommendList/index";
import ImageConvertor from './pages/ImageConvertor'
import Group from "./pages/Group";
import GroupRoom from "./pages/GroupRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/intro" element={<Intro />} /> */}
        <Route path="/list" element={<RecommendList />} />
        <Route path="/isbn" element={<Isbn />}/>
        <Route path="/image" element={<ImageConvertor/>} />
        <Route path="/bookgroup" element={<Group />} />
        <Route path="/bookgroup/:groupid" element={<GroupRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
