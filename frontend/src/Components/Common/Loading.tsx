import styled from "styled-components";
import Spinner from '../../Assets/Images/spinner.gif'
import useSelectorTyped from "../../Store";

export default function Loading() {
  const nickname = useSelectorTyped((state) => state.user.name)

  return (
    <Background>
      <LoadingText>{nickname}님을 위한 책을 찾고 있어요!
      <br/>잠시만 기다려 주세요 😊</LoadingText>
      <LoadingText>
        <img src={Spinner} width="50%" />
      </LoadingText>
    </Background>
  );
}

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: #F9F9F7;
  z-index: 11;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 20px;
  opacity: 1;
`;
