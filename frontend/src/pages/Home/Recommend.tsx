import React from 'react';
import styled from 'styled-components';
import useSelectorTyped from '../../Store';
import sample from '../../Assets/Images/sample.png'

export default function Recommend() {
    const nickname = useSelectorTyped((state) => state.user.name)
    return (
        <Container>
            <Title>{nickname}님을 위한<br></br>추천도서</Title>
            <Tags>#취향분석 #맞춤추천</Tags>
            <Contents>
                <LinkTag>
                    <Book>
                        <Top></Top>
                        <Cover></Cover>
                        <Side></Side>
                    </Book>
                </LinkTag>
            </Contents>
        </Container>
    );
}

const Container = styled.div`
    width : 100%;
  height: 600px;
    background-color: #E3E3CF;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.div`
    font-family: 'Gowun Dodum', sans-serif;
    font-weight: 800;
    font-size: 25px;
    text-align: center;
    margin : 12% auto 5% auto;
`

const Tags = styled.div`
    font-family: 'Nanum Gothic Coding', monospace;
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 3%;
`

const Contents = styled.div`
    width : 90%;
    height: 60%;
    margin : 10% 0 5% 0;
    border-radius: 200px 200px 0 0;
    background-color: white;
`
const LinkTag = styled.div`
    div {
    position: absolute;
    box-sizing: border-box;
    transform-origin: left top;
    }
`

const Book = styled.div`
    display: flex;
    /* flex-shrink: 0; */
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width : 200px;
    height: 300px;
    position : relative;
`

const Top = styled.div`
    position: absolute;
    width: 100%;
    transform: matrix(0.79, -0.62, 0, 1, 0, 0);
    height: 2rem;
    background-color: red;
`

const Side = styled.div`
    position: absolute;
    width: 100%;
    background-color: red;
    transform: matrix(0.79, -0.62, 0, 1, 0, 0);
`
const Cover = styled.div`
    position: absolute;
    background-image: url(${sample});
    background-size: cover;
    width: 100%;
    height: 100%;
    box-shadow: rgb(238, 238, 238) 1px 1px 1px 1px;
    transform: matrix(0.99, 0.13, 0, 1, 0, 0);
`
