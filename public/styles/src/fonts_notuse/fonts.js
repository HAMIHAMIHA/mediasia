// import Roboto from './Roboto-Black-1.ttf'
import { createGlobalStyle } from 'styled-components'
import roboto_black_1_webfont from './roboto_black_1_webfont.woff';
import roboto_black_1_webfont2 from './roboto_black_1_webfont.woff2';

export default createGlobalStyle`
    @font-face{
        font-family:'Roboto';
        src: local('Roboto'),local('Roboto'),
        url(${roboto_black_1_webfont}) format('woff2'),
        url(${roboto_black_1_webfont2}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`