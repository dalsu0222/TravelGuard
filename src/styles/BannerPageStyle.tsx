import styled from "@emotion/styled";

export const expCard = styled.div`
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
`;

export const stepCol = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  /* gap: 1rem; */
`;
