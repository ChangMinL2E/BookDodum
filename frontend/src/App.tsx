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
<<<<<<< HEAD
import WriteText from "./pages/WriteText";

=======
import GroupCreate from "./pages/GroupCreate";
>>>>>>> 3af0afbb2f87284305be5a325c271fb2e977c56e

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/intro" element={<Intro />} /> */}
        <Route path="/list" element={<RecommendList />} />
        <Route path="/library" element={<Library />} />
        <Route path="/isbn" element={<Isbn />}/>
        <Route path="/image" element={<ImageConvertor/>} />
        <Route path = "/mypage" element={<Mypage/>} />
        <Route path = '/reading' element = {<ReadingBooks/>} />
        <Route path="/bookgroup" element={<Group />} />
        <Route path="/bookgroup/:groupid" element={<GroupRoom />} />
<<<<<<< HEAD
        <Route path ="/write/" element={<WriteText />} />
=======
        <Route path="/groupcreate" element={<GroupCreate />} />
>>>>>>> 3af0afbb2f87284305be5a325c271fb2e977c56e
      </Routes>
    </BrowserRouter>
  );
}

export default App;
