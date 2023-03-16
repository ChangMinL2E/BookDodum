import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reader from "./pages/Reader.js";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reader" element={<Reader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
