import React from "react";
import styled from "@emotion/styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  name?: string; // name prop 추가, modal 유형 지정 가능
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

interface ModalContentProps {
  isMap: boolean;
}

const ModalContent = styled.div<ModalContentProps>`
  background: var(
    --box-style,
    radial-gradient(
      211.29% 142.64% at 0% 0%,
      rgba(127, 169, 255, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    rgba(8, 8, 8)
  );
  padding: 20px 30px;
  border-radius: 8px;
  max-width: ${(props) => (props.isMap ? "65%" : "50%")}; // 조건부 스타일링
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  color: #fff;
  border-top: 1px solid var(--box-stroke, #7fa9ff);
  border-bottom: 1px solid var(--box-stroke, #7fa9ff);

  /* 커스텀 스크롤바 스타일 */
  overflow-y: scroll;
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

  @media (max-width: 768px) {
    max-width: ${(props) => (props.isMap ? "100%" : "80%")};
    padding: ${(props) => (props.isMap ? "5px" : "")};
  }
`;

const CloseButton = styled.button<ModalContentProps>`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  @media (max-width: 768px) {
    color: ${(props) => (props.isMap ? "#000" : "")};
    margin-right: 5px;
  }
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, name }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent isMap={name === "map"} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} isMap={name === "map"}>
          &times;
        </CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
