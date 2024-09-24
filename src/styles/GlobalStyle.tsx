import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";

const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
      }
    `}
  />
);

export const Wrap = styled.div`
  position: relative;
  width: 100vw;
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: 86.48px;
  overflow-x: hidden;
`;

export const mw = styled.div`
  max-width: 1300px;
  width: calc(100% - 160px);
  /* min-width: 800px; */
  margin: 2rem auto;
`;

export default GlobalStyle;
