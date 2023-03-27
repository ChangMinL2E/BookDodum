/* global kakao */
import React, { useEffect, useState } from "react";
import Nav from "../../Components/Common/Nav";
import DetailModal from "../../Components/Contents/DetailModal";
import Banner from "./Banner";
import BookList from "./BookList";
import LibraryBooks from "./LibraryBooks"
import sample from '../../Assets/Images/sample.png'
import ReadingBooks from "./ReadingBooks";
import BestKeyword from "./BestKeyword";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

export default function Home() {
  const [map, setMap] = useState(null)

  const getRegionCode = async (longitude: string, latitude: string) => {
    // const data = await getRegionLibraryAPI()
    // const data = await getRegionCodeAPI(longitude, latitude)
    // console.log(data)
  }

  // useEffect(() => {
  //   console.log('얍')
  //   const container = document.getElementById('map')
  //   const options = {
  //     center: new kakao.maps.LatLng(curLocation[0], curLocation[1]),
  //     level: 4
  //   };
  //   let map = new kakao.maps.Map(container, options)
  // },[curLocation])


  return (
    <>
      {/* <div id="map" style={{ width: "100%", height: "350px" }}></div> */}
      <Nav />
      <Banner />
      <ReadingBooks />
      <BookList />
      <LibraryBooks />
      {/* <DetailModal bookId={1}/> */}
      <BestKeyword />
    </>
  );
}
