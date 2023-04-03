import React, { useState } from "react";
import mypagebanner from "../../Assets/Images/mypagebanner.png";
import styled from "styled-components";
import useSelectorTyped from "../../Store";
// Components
import SideBar from "../../Components/Common/SideBar";

export default function MypageBanner() {
  const nickname = useSelectorTyped((state) => state.user.name);

  const [sideMenu, setSideMenu] = useState<boolean>(false);
  
  const showSideMenu = (): void => {
    setSideMenu(!sideMenu);
  };

  const hideSideMenu = (): void => {
    setSideMenu(false);
    window.scrollTo(0, 0);
  };
  return (
    <>
      <SideBar sideMenu={sideMenu} hideSideMenu={hideSideMenu} />
      <BannerImage>
        <Burgur onClick={showSideMenu}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="19" y1="22.5" x2="44" y2="22.5" stroke="white" />
            <line x1="19" y1="31.5" x2="44" y2="31.5" stroke="white" />
            <line x1="19" y1="40.5" x2="44" y2="40.5" stroke="white" />
          </svg>
        </Burgur>
        <UserNameText>{nickname}님의 책방</UserNameText>
        <IntroText>{nickname}님의 취향이 가득 찬 책방입니다.</IntroText>
      </BannerImage>
    </>
  );
}

const Burgur = styled.div`
  position: absolute;
  top : 0;
  left: 0;
`;

const BannerImage = styled.div`
  background-blend-mode: multiply;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 30vh;
  background-image: url(${mypagebanner});
  background-size: cover;
`;

const UserNameText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 18%;
  font-size: 25px;
  font-weight: bold;
  color: white;
  font-family: "Gowun Batang", serif;
`;

const IntroText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-family: "Gowun Batang", serif;
  padding-top: 5%;
`;
