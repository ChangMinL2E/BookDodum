import { createGlobalStyle } from "styled-components";
// 각 폰트 파일 import
import InterRegular from "../Assets/Fonts/InterRegular.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: 'InterRegular';
        src: local('InterRegular'), url(${InterRegular}) format('ttf');
        font-weight: normal;
    }
`;
