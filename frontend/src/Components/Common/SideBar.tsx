import React from "react";
import styled from "styled-components";
import logo from '../../Assets/Images/logo-black.png'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";


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
const Logo = styled.div`
  display: flex;
  margin: 20% 0 15% 5%;
`

const LogoImg = styled.div`
  width : 70px;
  margin-left: 3%;
`

const LoginBtn = styled.div`
  width : 100%;
  height: 64px;
  background-color: #5C5649;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  margin: 0 0 10% 0;
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
  margin: 3% 0;
  display: flex;
  align-items: center;
`

const MenuText = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-left:10%;
`
const TextTop = styled.div`
color: #ffffff;
font-weight: bold;
padding-left: 8%;
font-size: 16px;
`
const TextBottom = styled.div`
color: #ffffff;
padding-left: 8%;
margin-top: 2%;
font-size: 12px;
`

const InfoMsg = styled.div`
  font-size: 12px;
  position: absolute;
  width: 90%;
  margin-left: 7%;
  bottom : 2.5%;
`

// 타입 선언

type Props = {
  sideMenu: boolean,
  hideSideMenu: () => void;
}

// 컴포넌트 정의
const SideBar: React.FC<Props> = ({ sideMenu, hideSideMenu }) => {
  const navigate = useNavigate();

  return (
    <>
      <BackGround className={sideMenu ? 'open' : ''} onClick={() => hideSideMenu()} />
      <Container className={sideMenu ? 'open' : ''} onClick={() => hideSideMenu()}>
        <Wrap>
          <Logo>
            <BookOpenIcon width="40px" strokeWidth="0.5px" color="#5C5649" />
            <LogoImg>
              <img src={logo} width="70px" height="35px" />
            </LogoImg>
          </Logo>
          <LoginBtn>
            <TextTop>북,돋움 해보기</TextTop>
            <TextBottom>로그인/회원가입</TextBottom>
          </LoginBtn>
          <Menus>
            <Menu>
              <MenuText>홈</MenuText>
            </Menu>
            <Menu>
              <MenuText>독서모임</MenuText>
            </Menu>
            <Menu>
              <MenuText>내 책방</MenuText>
            </Menu>
          </Menus>
        </Wrap>
        <InfoMsg onClick={() => navigate('/intro')}>북,돋움에 처음 오셨나요? 더 알아보기</InfoMsg>
      </Container>
    </>
  );
}

export default SideBar 

