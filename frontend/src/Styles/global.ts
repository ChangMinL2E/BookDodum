import { createGlobalStyle } from "styled-components";
// 각 폰트 파일 import
import InterRegular from "../Assets/Fonts/InterRegular.ttf";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'InterRegular';
    src: local('InterRegular'), local('InterRegular');
    font-style: normal;
    src: url(${InterRegular}) format('truetype');
}
`;
