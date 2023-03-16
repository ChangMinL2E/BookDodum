import styled from 'styled-components';
import logo from '../../Assets/Images/logo-black.png'

export default function Nav() {
  return (
    <Container>
      <Contents>
        <Hamburgur></Hamburgur>
        <Logo/>
        <Block/>
      </Contents>
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

const Block = styled.div`
  
`
