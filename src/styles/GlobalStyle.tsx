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
        font-size: 16px;
        @media (max-width: 768px) {
          font-size: 12px; // smaller
        }
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
  @media (max-width: 768px) {
    margin-top: 57px;
  }
`;

export const mw = styled.div`
  max-width: 1300px;
  /* width: calc(100% - 160px); */
  width: calc(100% - 180px);
  /* min-width: 800px; */
  margin: 2rem auto;
  position: relative;
  @media (max-width: 768px) {
    width: calc(100% - 32px);
    margin: 1rem auto;
  }
`;

export const ResponsiveHeading = styled.h1`
  font-size: 32px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ResponsiveParagraph = styled.p`
  font-size: 20px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default GlobalStyle;
