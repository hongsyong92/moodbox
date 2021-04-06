import { createGlobalStyle } from "styled-components";
import "fonts/NotoSansCJKkr_font.css";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};
  body {
    width: 100%;
    height: 100%;
    background: #0F2027;
    background: -webkit-linear-gradient(to right, #2C5364, #203A43, #0F2027);
    background: linear-gradient(to right, #2C5364, #203A43, #0F2027);
    font-family: 'Noto Sans KR', sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input {
    all: unset;
    appearance: none;
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
