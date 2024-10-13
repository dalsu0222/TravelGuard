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
        --back-Linear: linear-gradient(180deg, #0a033a 0%, #040019 100%);
        background: var(--back-Linear);
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
  --back-Linear: linear-gradient(180deg, #0a033a 0%, #040019 100%);
  background: var(--back-Linear);
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  padding-top: 90.47px;
  overflow-x: hidden;
  @media (max-width: 1000px) {
    padding-top: 57px;
  }
`;

export const mw = styled.div`
  max-width: 1300px;
  width: calc(100% - 180px);
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
