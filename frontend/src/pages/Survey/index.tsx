import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../Assets/Images/logo-white.png';

export default function Survey() {
    const navigate = useNavigate();
    const step = useParams().step;
    
    return (
        <Container>
            <Logo src={logo}></Logo>
            <Question >당신이 책을 읽는 이유는 무엇인가요?</Question>
            <BarContainer>
                <ul>
                    <li>
                        <ProgressBar className={`step${step}`} />
                    </li>
                </ul>
            </BarContainer>
            <Contents>
                <button onClick={() => navigate(`/survey/${Number(step) + 1}`)}>다음</button>
            </Contents>
        </Container>
    );
}

// Styled Components
const Container = styled.div`
    background: #5C5649;
    width: 100%;
    height: 100vh;
    position: relative;
`

const Logo = styled.img`
    width: 13%;
    position: absolute;
    top: 2%;
    left: 4%;
    display: block;
`

const Question = styled.div`
    position: absolute;
    left: 50%;
    top : 7rem;
    text-align: center;
    color: white;
    font-family: 'Gowun Batang', serif;
    transform: translate(-50%, 0%);
`

const BarContainer = styled.div`
    position: absolute;
    width: 100%; 
    left: 50%;
    top : 12rem;
    transform: translate(-50%, 0%);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    ul {
        position: relative;
        padding: 0;
        list-style: none;
        width: 75%;
    li {
        background-color: #ffffff48;
        height:8px; 
        border-radius:10px;
        }
    }
`

const ProgressBar = styled.div`
    /* width: 80%;  */
    position: absolute;
    border-radius: 10px; 
    background: rgb(255,255,255);
    background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,1) 100%);
    height: 8px;
    &.step1 {
        -moz-animation: step1 1.5s ease-out;
        -webkit-animation: step1 1.5s ease-out;
        width: 25%; 
    } 
    &.step2 {
        -moz-animation: step2 1.5s ease-out;
        -webkit-animation: step2 1.5s ease-out;
        width: 50%; 
    } 
    &.step3 {
        -moz-animation: step3 1.5s ease-out;
        -webkit-animation: step3 1.5s ease-out;
        width: 75%; 
    } 
    &.step4 {
        -moz-animation: step4 1.5s ease-out;
        -webkit-animation: step4 1.5s ease-out;
        width: 100%; 
    } 
    &:after  {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        content: "";
        width:16px;
        height: 16px;
        position: absolute;
        top:-4px;
        right: 0;
        border-radius: 50%;
        background-color:white;
    }
    @keyframes step1 {
        0% { 
            width: 0%;
        } 
        100% { 
            width: 25%;
        }  
    }
    @keyframes step2 {
        0% { 
            width: 25%;
        } 
        100% { 
            width: 50%;
        }  
    }
    @keyframes step3 {
        0% { 
            width: 50%;
        } 
        100% { 
            width: 75%;
        }  
    }
    @keyframes step4 {
        0% { 
            width: 75%;
        } 
        100% { 
            width: 100%;
        }  
    }
`

const Contents = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    position: absolute;
    top : 18rem;
    border-radius: 40px 40px 0 0;
`