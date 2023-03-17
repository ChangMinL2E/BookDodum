import React from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  width : 100%;
  height: 550px;
  background-color: #F9F9F7;
  border: 2px solid green;
`
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  /* text-shadow: 0px 2px 2px 0px #00000040; */
`;

const Desc = styled.div`
  margin-top: 5%;
  font-size: 12px;
  color: #5c5c5c;
  text-align: center;
`;

// Type
type Props = {
  // 도서관 추천 리스트
};

// Component
const Library: React.FC<Props> = ({}) => {
  return (
    <Container>
      <Title>
        가장 가까운 도서관의
        <br />
        인기 대출 도서
      </Title>
      <Desc>""의 인기 도서를 만나보세요!</Desc>
    </Container>
  );
};

export default Library;
