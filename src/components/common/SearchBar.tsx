import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  onSearch: (country: string) => void;
  errorContent: string | null;
  onInputChange: () => void;
}

const SearchBarContainer = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100px;
  left: 20px;
  display: flex;
  align-items: center;
  transition: width 0.3s ease-in-out;
  width: ${(props) => (props.isOpen ? "300px" : "56px")};
  overflow: visible;
  z-index: 1;
  @media (max-width: 1000px) {
    top: 70px;
  }
`;

const SearchIcon = styled.div`
  cursor: pointer;
  padding: 16px 20px;
  background-color: rgba(198, 198, 198, 0.8);
  border-radius: 50%;
  z-index: 2;
  @media (max-width: 1000px) {
    padding: 10px 15px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 25px;
  background-color: #dadada;
  margin-left: 2px;
  padding-left: 35px;
  outline: none;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  position: absolute;
  top: 100%;
  left: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 5px;
  white-space: nowrap;
`;

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  errorContent,
  onInputChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onInputChange();
  };

  return (
    <SearchBarContainer isOpen={isOpen}>
      <SearchIcon onClick={handleToggle} onMouseEnter={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faMagnifyingGlass} />
      </SearchIcon>
      {isOpen && (
        <>
          <SearchInput
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="국가명을 입력하세요..."
          />
          {errorContent && <ErrorMessage>{errorContent}</ErrorMessage>}
        </>
      )}
    </SearchBarContainer>
  );
};

export default SearchBar;
