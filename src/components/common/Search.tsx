import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;
const Input = styled.input`
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 8px;
  background: #020010;
  width: 100%;
  color: #f0f0f0;
  &::placeholder {
    color: #aeaeae;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #f0f0f0;
`;

export default function Search({
  onSearch,
  placeholder = "대륙 또는 국가 명을 입력하세요",
}: {
  onSearch: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <SearchContainer>
      <IconWrapper>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </IconWrapper>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </SearchContainer>
  );
}
