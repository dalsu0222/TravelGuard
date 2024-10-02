import styled from "@emotion/styled";

export const Box = styled.div`
  border-radius: 8px;
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
  padding: 16px;
  &.countryName {
    display: flex;
    align-items: center;
  }
  &.scroll {
    overflow-y: scroll;
    /* max-height: 400px; */
    max-height: calc(100vh - 360px - 3rem - 2rem);
    &.permission {
      max-height: calc(100vh - 320px - 3rem);
    }
    &.embassy {
      max-height: calc(100vh - 320px - 3rem);
    }
    /* 커스텀 스크롤바 스타일 */
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(127, 169, 255, 0.1);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(127, 169, 255, 0.5);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: rgba(127, 169, 255, 0.7);
    }

    /* Firefox에서의 스크롤바 스타일 */
    scrollbar-width: thin;
    scrollbar-color: rgba(127, 169, 255, 0.5) rgba(127, 169, 255, 0.1);
  }

  @media (max-width: 1000px) {
    padding: 12px;
    &.scroll {
      max-height: calc(100vh - 310px - 2rem);
      &.permission {
        max-height: calc(100vh - 235px - 3rem);
      }
      &.embassy {
        max-height: calc(100vh - 235px - 3rem);
      }
    }
  }
`;

export const TabsContainer2 = styled.div`
  display: flex;
  /* justify-content: space-between; */
  /* background-color: #020010; */
  /* padding: 1rem; */
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 14px;

  /* overflow-x: auto;
  -webkit-overflow-scrolling: touch; */

  @media (max-width: 1000px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Tab2 = styled.div`
  /* flex: 1; */
  text-align: center;
  padding: 1rem;
  cursor: pointer;
  color: #f0f0f0;
  border-bottom: 2px solid transparent;
  border-radius: 8px;
  /* border: 1px solid var(--box-stroke, #7fa9ff); */
  background: rgba(8, 8, 8, 0.9);
  white-space: nowrap;

  &.active {
    background: var(
      --box-style,
      radial-gradient(
        211.29% 142.64% at 0% 0%,
        rgba(127, 169, 255, 0.2) 0%,
        rgba(0, 0, 0, 0) 100%
      ),
      rgba(8, 8, 8, 0.8)
    );
    border-bottom: 2px solid #7fa9ff;
    color: white;
  }

  &:hover {
    background-color: #151524;
  }

  @media (max-width: 1000px) {
    padding: 0.75rem;
    font-size: smaller;
    flex: 1 1 auto;
  }
`;

export const GridUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 16px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
`;

export const Li = styled.li`
  display: inline-block;
  margin-right: 1rem;
  /* border: 1px solid #333; */
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: rgba(127, 169, 255, 0.2);
    color: #7fa9ff;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  }

  @media (max-width: 1000px) {
    margin-right: 0.5rem;
    font-size: smaller;
  }
`;
