import styled from "@emotion/styled";

export const th = styled.th`
  padding: 10px;
  border-bottom: 1px solid #7fa9ff;
  position: sticky;
  top: 0;
  background: radial-gradient(
      211.29% 142.64% at 0% 0%,
      rgba(127, 169, 255, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    rgba(8, 8, 8, 0.8);
  color: #7fa9ff;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: smaller;
    padding: 8px;
  }
`;

export const td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #5e5e5e;
  &:hover a {
    color: #7fa9ff;
    transition: color 0.3s ease-in-out;
  }
  &:hover svg {
    color: #7fa9ff !important;
    transition: color 0.3s ease-in-out;
  }
  & svg {
    margin-left: 10px;
    background: #979797;
    border-radius: 5px;
    padding: 4px;
    font-size: smaller;
    transform: translateY(3px);
  }
  & a {
    display: block;
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px;

    & svg {
      margin-left: 5px;
      padding: 2px;
    }
  }
`;
export const ResponsiveTable = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;
