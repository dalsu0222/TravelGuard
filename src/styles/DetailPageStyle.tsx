import styled from "@emotion/styled";

export const FlagImg = styled.img`
  max-width: 100px;
  border-radius: 5px;
  transform: translateY(3px);
  margin-right: 1rem;

  @media (max-width: 768px) {
    max-width: 60px;
  }
`;

export const TableTitle = styled.h3`
  border-bottom: 1px solid #7fa9ff;
  padding-bottom: 0.5rem;
  padding-left: 5px;
  font-size: clamp(18px, 4vw, 24px);
`;

export const TableTr = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 5px;
  border-bottom: 1px solid #5e5e5e;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TableTd = styled.td`
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 말줄임표로 표시 */
  /* max-width: 300px;  */

  @media (max-width: 768px) {
    white-space: normal;
    margin-bottom: 0.5rem;
  }
`;

export const InfoTr = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 5px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const InfoTd = styled.td`
  white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
  max-width: 300px; /* 원하는 최대 너비 설정 */
  color: #7fa9ff;
  margin-right: 10px;

  @media (max-width: 768px) {
    white-space: normal;
    max-width: 100%;
    margin-bottom: 0.5rem;
  }
`;

// eslint-disable-next-line react-refresh/only-export-components
export const backBtn = styled.button`
  background: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  /* border: none; */
  /* border: 1px solid #7fa9ff; */
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 0.3rem 0.8rem;
  }
`;

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* padding-bottom: 75%;  // 4:3비율 유지
  overflow: hidden; */
`;

export const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  /* position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
    object-fit: cover; // 이미지가 컨테이너를 꽉 채우도록 설정
  object-position: center; // 이미지를 중앙에 위치시킴 */
`;

export const MapButton = styled.button`
  border: none;
  background: #6296ff;
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 5px;
  cursor: pointer;
  z-index: 10;
  /* padding: 0.5rem 1rem; */
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 3px;
  }
`;

export const SafetyCon = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 12px;
    font-size: smaller;
  }
`;

export const NoticeContent = styled.div`
  margin-top: 1rem;
  line-height: 1.6;
  font-size: 1rem;
  color: #fff;

  & img {
    width: 100%;
  }
  & * {
    color: #fff; // 내용 색 모두 흰색으로 변경
  }

  & table td * {
    padding: 2px 5px;
    background: white;
    color: black !important;
  }

  @media (max-width: 768px) {
    & * {
      font-size: small !important;
      color: white !important;
    }
  }
`;

export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export const MapBox = styled.div`
  aspect-ratio: 16/9;
  width: 100%;

  @media (min-width: 769px) {
    aspect-ratio: 4/3;
    max-width: 60%;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

export const ModalMapImage = styled.img`
  width: 98%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const InfoTable = styled.table`
  width: 100%;
  @media (max-width: 768px) {
    font-size: smaller;
  }
`;
