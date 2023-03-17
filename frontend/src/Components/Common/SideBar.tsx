import React from "react";
import styled from "styled-components";

const Container = styled.div`
  z-index: 5;
  height: 100%;
  left: -70%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;
  &.open {
    left: 0;
    transition: 0.5s ease;
  }
background-color: #F7F3EB;
width: 250px;
  
`;

const BackGround = styled.div`
 
  &.open {
  position: fixed;
  top : 0;
  z-index: 4;
  width : 100vw;
  height: 100%;
  background-color: black;
  opacity: 60%;
  }
`

const Wrap = styled.div`
width:90%;
margin: auto;
display: flex;
flex-direction: column;
`
const Logo = styled.div``
const LoginBtn = styled.div`
  width : 100%;
  height: 64px;
  background-color: #5C5649;
  border-radius: 5px;
`
const Menus = styled.div`
padding: 5% 0;

  border-top : 0.2px solid #979591;
  border-bottom : 0.2px solid #979591;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Menu = styled.div`
  width:95%;
  height: 35px;
  background-color: #E4DDCC;
  color: #5C5649;
  border-radius: 35px;
  margin: 2% 0;
  display: flex;
  align-items: center;
`

const MenuText = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-left:10%;
`

// 타입 선언

type Props = {
  sideMenu: boolean,
  hideSideMenu: () => void;
}

// 컴포넌트 정의

const SideBar: React.FC<Props> = ({ sideMenu, hideSideMenu }) => {

  return (
    <>
      <BackGround className={sideMenu ? 'open' : ''} onClick={() => hideSideMenu()} />
      <Container className={sideMenu ? 'open' : ''}>
        <Wrap>

          <Logo></Logo>
          <LoginBtn>
              
          </LoginBtn>
          <Menus>
            <Menu>
              <MenuText>홈</MenuText>
            </Menu>
            <Menu>
              <MenuText>내 책방</MenuText>
              </Menu>
          </Menus>
        </Wrap>
      </Container>
    </>
  );
}

export default SideBar


