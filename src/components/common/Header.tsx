import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as H from "../../styles/HeaderStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEarthAsia } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navigate = useNavigate();
  const goToPage = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <H.HeaderCon>
      <H.LogoCon onClick={() => goToPage("/")}>
        <H.Logo src="/assets/img/LOGO.png" alt="logo" />
      </H.LogoCon>
      <H.MobileMenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </H.MobileMenuIcon>
      <H.Nav isOpen={isMenuOpen}>
        <H.Ul>
          <H.Li isActive={isActive("/main")} onClick={() => goToPage("/main")}>
            국가별 정보
          </H.Li>
          <H.Li
            isActive={isActive("/permission")}
            onClick={() => goToPage("/permission")}
          >
            입국 허가요건 정보
          </H.Li>
          <H.Li
            isActive={isActive("/embassy")}
            onClick={() => goToPage("/embassy")}
          >
            국가별 대사관 정보
          </H.Li>
          {location.pathname !== "/" ? (
            <H.Li onClick={() => goToPage("/")}>
              <FontAwesomeIcon icon={faEarthAsia} size="lg" />
            </H.Li>
          ) : (
            ""
          )}
        </H.Ul>
      </H.Nav>
      <H.LogoCon className="desktop-only">
        <H.Logo src="" />
      </H.LogoCon>
    </H.HeaderCon>
  );
}
