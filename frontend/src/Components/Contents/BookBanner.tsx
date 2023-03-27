import React, { useEffect } from "react";
import styled from "styled-components";
import bookBanner from "../../Assets/Images/bookBanner.png";
import BookCover from "./BookCover";

interface Props {
  imageUrl: string;
}

export default function BookBanner({imageUrl}: Props) {
  return (
    <>
      <BannerImage>
        <BookCover name={"bannerimg"} imageUrl={imageUrl} size={120} />
      </BannerImage>
    </>
  );
}
const BannerImage = styled.div`
  width: 100vw;
  height: 30vh;
  background: url(${bookBanner});
  background-size: cover;
`;
