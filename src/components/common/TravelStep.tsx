import ColorBadge from "./ColorBadge";
import styled from "@emotion/styled";

interface TravelStepProps {
  number: 1 | 2 | 3 | 4;
}

const Travelstep = styled.div`
  width: 150px; // 고정 너비 지정
  display: flex;
  align-items: center;
`;

export default function TravelStep({ number }: TravelStepProps) {
  const title: string[] = [
    "",
    "1단계 여행유의",
    "2단계 여행자제",
    "3단계 출국권고",
    "4단계 여행금지",
  ];
  return (
    <Travelstep>
      <ColorBadge number={number} />
      <span className="steptitle">
        <b>{title[number]}</b>
      </span>
    </Travelstep>
  );
}
