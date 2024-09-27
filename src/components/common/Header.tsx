import * as H from "../../styles/HeaderStyle";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const navigate = useNavigate();
  const goToPage = (path: string) => {
    navigate(path);
  };

  return (
    <H.HeaderCon>
      <H.LogoCon onClick={() => goToPage("/")}>
        <H.Logo src="/assets/img/LOGO.png" alt="logo" />
      </H.LogoCon>
      <H.Nav>
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
        </H.Ul>
      </H.Nav>
      <H.LogoCon>
        <H.Logo src="" />
      </H.LogoCon>
    </H.HeaderCon>
  );
}
