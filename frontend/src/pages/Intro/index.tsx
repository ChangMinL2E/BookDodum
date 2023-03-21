import React from 'react';
import styled from 'styled-components';
import intro from '../../Assets/Images/intro.png'

export default function Intro() {
    return (
        <Container>
        </Container>
    );
}

const Container = styled.div`
width:100vw;
height: 100vh;
background-size: cover;
    background-image: url(${intro});
`

