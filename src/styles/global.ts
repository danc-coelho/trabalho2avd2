import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 10px;
    padding: 1px;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    height: 100vh;
    background: #ddddff;
    color: #000000;
  }
  
  body, input, button {
    font: 16px 'Arial', sans-serif;
  }

  button {
    cursor: pointer;
  }

  #root{
    max-width: 960px;
    margin: 0 auto;
    padding: 10px 30px;
  }
`;
