import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
<<<<<<< HEAD
import ImageConvertor from "./pages/ImageConvertor";
import { Reader } from "./pages/Reader";


=======
import { Isbn } from "./pages/Isbn";
>>>>>>> f5649e4fd8db5f858240fdf153d5d35c5815d784
import RecommendList from "./pages/RecommendList/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/list" element={<RecommendList />} />
<<<<<<< HEAD
        <Route path="/reader" element={<Reader />} />
        <Route path='/image' element={<ImageConvertor />} />
=======
        <Route path="/isbn" element={<Isbn />}/>
>>>>>>> f5649e4fd8db5f858240fdf153d5d35c5815d784
      </Routes>
    </BrowserRouter>
  );
}

export default App;
