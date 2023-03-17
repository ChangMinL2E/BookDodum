import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Intro from './pages/Intro';
import { Reader } from "./pages/Reader";

import RecommendList from "./pages/RecommendList/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/list" element={<RecommendList />} />
        <Route path="/reader" element={<Reader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
