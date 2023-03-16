import { useState } from 'react';
import styled from 'styled-components';
import logo from '../../Assets/Images/logo-black.png'
import SideBar from './SideBar';
// import {} from '@heroicons/react'

export default function Nav() {
  const [showSide, setShowSide] = useState<boolean>(true);

  const showSideBar = () => {
    setShowSide(!showSide);
    document.body.style.overflow = "hidden";
  };

  const hideSideBar = () => {
    setShowSide(false);
    document.body.style.overflow = "unset";
  };


  return (
    <Container>
      <Contents>
        <Hamburgur>=</Hamburgur>
        <Logo/>
        <div></div>
      </Contents>
      <SideBar showSide={showSide}/>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 64px;
`;

const Contents = styled.div`
  width : 90%;
  height: 90%;
  margin: auto;
  display: flex;
  justify-content : space-between;
  align-items: center;
`;

const Hamburgur = styled.div`
  
`

const Logo = styled.div`
  background: url(${logo});
  height:30px;
  background-size: cover;
  width : 56px;
`
