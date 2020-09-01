import React from 'react';
import styled, { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes'

const GlobalStyles = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
  }
`

const App = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 1fr 0.5fr 1fr;
  grid-template-areas:
  "cabeçalho cabeçalho cabeçalho"
  "nothing main nothingagain";
`

export default () => {
  return (
    <Router>
      <GlobalStyles />
      <App>
        <Routes />
      </App>
    </Router>
  );
}