import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import TravelStep from "./TravelStep";
import * as B from "../../styles/BannerPageStyle";
import { TRAVEL_ADVISORY_LEVELS } from "../../utils/constant/travelAdvisory";

interface ExpCardProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpCard: React.FC<ExpCardProps> = ({ isExpanded, setIsExpanded }) => {
  return (
    <B.ExpCard isExpanded={isExpanded}>
      <B.CardHeader
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ display: window.innerWidth <= 1000 ? "block" : "none" }}
      >
        {isExpanded ? (
          <FontAwesomeIcon icon={faChevronDown} size="2x" />
        ) : (
          <FontAwesomeIcon icon={faChevronUp} size="2x" />
        )}
        <span>여행 경보 단계</span>
      </B.CardHeader>
      <B.CardContent>
        {TRAVEL_ADVISORY_LEVELS.slice(0, 5).map((level, index) => (
          <B.StepCol key={index}>
            <TravelStep number={index as 0 | 1 | 2 | 3 | 4} />
            <div style={{ fontSize: "14px", flexGrow: 1 }}>
              <p>{level.description}</p>
              {level.additionalInfo && <p>{level.additionalInfo}</p>}
            </div>
          </B.StepCol>
        ))}
      </B.CardContent>
    </B.ExpCard>
  );
};

export default ExpCard;
