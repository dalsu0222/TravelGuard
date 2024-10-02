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
        @media (max-width: 1000px) {
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
  margin-top: 90.47px;
  overflow-x: hidden;
  height: calc(100vh - 90.47px);
  @media (max-width: 1000px) {
    margin-top: 57px;
    height: calc(100vh - 57px);
  }
`;

export const mw = styled.div`
  max-width: 1300px;
  /* width: calc(100% - 160px); */
  width: calc(100% - 180px);
  /* min-width: 800px; */
  margin: 2rem auto;
  position: relative;
  @media (max-width: 1000px) {
    width: calc(100% - 32px);
    margin: 1rem auto;
  }
`;

export const ResponsiveHeading = styled.h1`
  font-size: 32px;
  @media (max-width: 1000px) {
    font-size: 24px;
  }
`;

export const ResponsiveHeading2 = styled.h2`
  font-size: 28px;
  @media (max-width: 1000px) {
    font-size: 20px;
  }
`;

export const ResponsiveParagraph = styled.p`
  font-size: 20px;
  @media (max-width: 1000px) {
    font-size: 16px;
  }
`;

export default GlobalStyle;
