import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactWordcloud from 'react-wordcloud';
import { useInView } from 'react-intersection-observer';
// APIs
import { getBestKeywordAPI } from '../../apis/bestkeyword';

interface KeyWord {
  text: string;
  value: number;
}

export default function BestKeyword() {
  const [ref, inView] = useInView()
  const [keywords, setKeywords] = useState<KeyWord[]>([])

  useEffect(() => {
    // 이달의 키워드 요청
    if(inView) getBestKeyword()
  }, [inView])

  const options: any = {
    colors: ["#edb02b", "#3464f7", "#258247", "#ed2b82", "#5a5752", "#6830bd",],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "Inter",
    fontSizes: [15, 70],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  const getBestKeyword = async () => {
    // 현재 년, 월
    const date = new Date()
    const month = date.getMonth()
    const year = date.getFullYear()

    let tmp: KeyWord[] = [];
    const data = await getBestKeywordAPI(String(year), String(month).padStart(2, '0'));

    data.forEach((item: any) => {
      tmp.push({
        text: item.children[0].value.slice(0, -2),
        value: Number(item.children[1].value.slice(0, -2)),
      })
    })

    setKeywords(tmp)
  }

  return (
    <Container>
      <Contents>
        <Title ref={ref} className={inView ? 'title' : ''}>
          지난 달의 베스트 키워드
          <br />
          TOP 70
        </Title>
        <Desc>월별 대출 급상승 도서의<br /> 책 소개, 서평 등에서 추출된 베스트 키워드!</Desc>
        <WordCloud>
          <ReactWordcloud words={keywords} options={options} />
        </WordCloud>
      </Contents>
    </Container>
  );
}


// Styled Components
const Container = styled.div`
  width : 100%;
  height: 550px;
  background-color: #F7F3EB;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Contents = styled.div`
  width: 95%;
`

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  margin: 3% 0; 
  text-shadow: 0px 3px 3px #00000040;
  &.title {
    animation: fadeIn 2s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity:3;
      transform: none;
    }   
  }
`;

const Desc = styled.div`
  margin-top: 5%;
  font-size: 13px;
  font-weight: 500;
  color: #5c5c5c;
  text-align: center;
`;

const WordCloud = styled.div`
  width : 90%;
  margin: 8% auto;
`