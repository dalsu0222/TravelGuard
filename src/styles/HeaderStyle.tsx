import styled from "@emotion/styled";
import facepaint from "facepaint";

const breakpoints = [576, 1000, 992, 1200, 1500];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

export const HeaderCon = styled.header`
  background-color: #020010;
  border-bottom: 1px solid #333;
  position: fixed;
  top: 0;
  /* width: 100%; */
  width: -webkit-fill-available;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  text-align: center;
  // padding을 창 크기에 따라 조절
  ${mq({
    padding: [
      "0px 10px", // 기본값
      "0px 20px",
      "0px 40px",
      "0px 60px",
      "0px 120px",
      "0px 200px",
    ],
  })}
  z-index: 999;
  @media (max-width: 1000px) {
    justify-content: center;
    border-bottom: 1px solid #333;
  }
`;

export const LogoCon = styled.div`
  cursor: pointer;
  padding: 2rem 3rem;
  @media (max-width: 1000px) {
    padding: 1rem 0.5rem;
    &.desktop-only {
      display: none;
    }
  }
`;

export const Logo = styled.img`
  /* width: 310.713px; */
  height: 10px;
  width: 150px;
  /* height: 10px;
  width: auto; */
  @media (max-width: 1000px) {
    height: 10px;
    width: auto;
  }
`;

export const MobileMenuIcon = styled.div`
  display: none;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  font-size: 24px; // Font Awesome 아이콘 크기 조정
  @media (max-width: 1000px) {
    display: block;
  }
`;

export const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
  transition: all 0.3s ease-in-out;
  @media (max-width: 1000px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #020010;
    border-top: 1px solid #333;
    max-height: ${(props) => (props.isOpen ? "300px" : "0")};
    overflow: hidden;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    /* padding: 1rem 0; */
    transition: all 0.3s ease-in-out;
    justify-content: center;
  }
`;

export const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  li:hover a {
    color: #7fa9ff;
    transition: color 0.3s ease-in-out;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

interface LiProps {
  isActive?: boolean;
}

export const Li = styled.li<LiProps>`
  margin: 0 10px;
  cursor: pointer;
  border-bottom: ${(props) => (props.isActive ? "1px solid #7FA9FF" : "none")};
  color: ${(props) => (props.isActive ? "#7FA9FF" : "white")};
  text-decoration: none;
  padding: 2rem 3rem;
  white-space: nowrap;

  &:hover {
    color: #7fa9ff;
    transition: color 0.3s ease-in-out;
  }

  a {
    color: ${(props) => (props.isActive ? "#7FA9FF" : "white")};
  }

  @media (max-width: 1000px) {
    width: 100%;
    text-align: center;
    padding: 1.5rem 1rem;
  }
`;
