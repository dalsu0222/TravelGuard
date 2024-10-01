import styled from "@emotion/styled";

export const ExpCard = styled.div<{ isExpanded: boolean }>`
  /* width: 352px; */
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* justify-content: space-between; */
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--box-stroke, #7fa9ff);
  background: var(
    --box-style,
    radial-gradient(
      211.29% 142.64% at 0% 0%,
      rgba(127, 169, 255, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    rgba(8, 8, 8, 0.8)
  );
  @media (max-width: 1000px) {
    transform: translateY(
      ${(props) => (props.isExpanded ? "0" : "calc(100% - 60px)")}
    );
    left: 1rem;
    right: 1rem;
    transition: all 0.3s ease-in-out;
  }
`;

export const StepCol = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  /* gap: 1rem; */
  margin: 0.5rem 0;
  @media (max-width: 1000px) {
    & * {
      font-size: small;
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);

  svg {
    font-size: 20px;
    margin-right: 10px;
  }

  span {
    color: white;
  }
`;
export const CardContent = styled.div`
  /* padding: 0.5rem; */
  max-height: 60vh;
  overflow-y: auto;
`;
