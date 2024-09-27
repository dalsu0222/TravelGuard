import styled from "@emotion/styled";
import facepaint from "facepaint";

const breakpoints = [576, 768, 992, 1200, 1500];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

export const HeaderCon = styled.header`
  background-color: #020010;
  /* background-color: red; */
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
`;

export const LogoCon = styled.div`
  cursor: pointer;
  padding: 2rem 3rem;
`;

export const Logo = styled.img`
  /* width: 310.713px; */
  height: 10px;
  width: 150px;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
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
`;

// export const Li = styled.li`
//   margin: 0 10px;
//   padding: 30px 0;
//   cursor: pointer;
// `;

interface LiProps {
  isActive: boolean;
}

export const Li = styled.li<LiProps>`
  margin: 0 10px;
  /* padding: 30px 0; */
  cursor: pointer;
  border-bottom: ${(props) => (props.isActive ? "1px solid #7FA9FF" : "none")};
  color: white;
  text-decoration: none;
  padding: 2rem 3rem;

  &:hover {
    color: #7fa9ff;
    transition: color 0.3s ease-in-out;
  }

  a {
    color: ${(props) => (props.isActive ? "#7FA9FF" : "white")};
  }
`;

export const A = styled.a`
  color: white;
  text-decoration: none;
  padding: 12px 24px;
`;
