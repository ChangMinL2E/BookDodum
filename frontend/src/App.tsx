import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Isbn } from "./pages/Isbn";
import RecommendList from "./pages/RecommendList/index";
import Mypage from "./pages/Mypage/Index";
import ReadingBooks from "./pages/ReadingBooks";
import ImageConvertor from "./pages/ImageConvertor";
import Library from "./pages/Library";
import Meeting from "./pages/Meeting";
import MeetingCreate from "./pages/MeetingCreate";
import MeetingRoom from "./pages/MeetingRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/intro" element={<Intro />} /> */}
        <Route path="/list" element={<RecommendList />} />
        <Route path="/library" element={<Library />} />
        <Route path="/isbn" element={<Isbn />} />
        <Route path="/image" element={<ImageConvertor />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/reading" element={<ReadingBooks />} />
        <Route path="/bookmeeting" element={<Meeting />} />
        <Route path="/bookmeeting/:meetid" element={<MeetingRoom />} />
        <Route path="/meetingcreate" element={<MeetingCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
