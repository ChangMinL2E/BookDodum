import React, { useState } from "react";
import image1 from "../../Assets/Images/oilpainting.png";
import image2 from "../../Assets/Images/oneline.png";
import image3 from "../../Assets/Images/windflower.png";
import styled from "styled-components";
import ImageAI from "../../Components/Contents/ImageAI";


const Select: React.FC = () => {
  const [images, setImages] = useState<string[]>([image1, image2, image3]);
  const [selected, setSelected] = useState<string>(image1);
  const handleImageChange = (image: string) => {
    setSelected(image);
  };

// 이미지 url, text 결과값 props
  return (
    <>
    <Container>
      <Images>
        {images?.map((image, index) => (
          <img
            src={image}
            key={index}
            alt={`painting/${index}`}
            width="40px"
            height="40px"
            onClick={() => handleImageChange(image)}
          />
        ))}
      </Images>
        <ImageAI imageUrl={selected} size={'200px'}/>
    </Container>
        <ButtonContainer>
        <Button type="submit">이 사진으로 할래요!</Button>
      </ButtonContainer>
    </>
  );
};

const Container = styled.div`
  width: 70%;
  margin: 5% auto;
  display: flex;
  justify-content: center;
  
`

const Images = styled.div`
  display: flex;
  margin-right: 2%;
  flex-direction: column-reverse;
  
`

// const Image = styled.div`
//   width: 200px;
//   height: 200px;
// `

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const Button = styled.button`
border: none;
box-shadow: rgba(97, 88, 88, 0.25) 0px 4px 1px;
background-color: #DBD4C3;
height: 50px;
width: 300px;
color: #5C5649;
font-weight: bold;
`
export default Select;
