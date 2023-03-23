import { useState } from "react";
import styled from "styled-components";
import logo from "../../Assets/Images/logo-black.png";
import SideBar from "./SideBar";


const Nav: React.FC = () => {
  const [sideMenu, setSideMenu] = useState<boolean>(false);

  const showSideMenu = (): void => {
    setSideMenu(!sideMenu);
  };

  const hideSideMenu = (): void => {
    setSideMenu(false);
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <Contents>
        <Hamburgur onClick={showSideMenu}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="64" height="64" />
            <line x1="19" y1="20.5" x2="44" y2="20.5" stroke="#5C5649" />
            <line x1="19" y1="31.5" x2="44" y2="31.5" stroke="#5C5649" />
            <line x1="19" y1="42.5" x2="44" y2="42.5" stroke="#5C5649" />
          </svg>
        </Hamburgur>
        {/* <Logo></Logo> */}
        <Image src={logo} />
        <div>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="64" height="64" />
          </svg>
        </div>
      </Contents>
      <SideBar sideMenu={sideMenu} hideSideMenu={hideSideMenu} />
    </Container>
  );
};

export default Nav;

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 64px;
  background-color: rgba(249, 249, 247, 0.7);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
`;

const Contents = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Hamburgur = styled.div``;

const Image = styled.img`
  height: 31px;
  width: 57px;
`;
