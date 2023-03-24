import React from "react";
// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
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
import Intro from "./pages/Intro";
import WriteText from "./pages/WriteText";

// React Query
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

// 클라이언트 초기화
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/list" element={<RecommendList />} />
          <Route path="/library/:ISBN" element={<Library />} />
          <Route path="/isbn" element={<Isbn />} />
          <Route path="/image" element={<ImageConvertor />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/reading" element={<ReadingBooks />} />
          <Route path="/bookmeeting" element={<Meeting />} />
          <Route path="/bookmeeting/:meetid" element={<MeetingRoom />} />
          <Route path="/meetingcreate" element={<MeetingCreate />} />
          <Route path="/write/" element={<WriteText />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
