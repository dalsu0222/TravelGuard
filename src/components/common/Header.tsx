import * as H from "../../styles/HeaderStyle";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <H.HeaderCon>
      <a href="/">
        <H.Logo src="/assets/img/LOGO.png" alt="logo" />
      </a>
      <H.Nav>
        <H.Ul>
          <H.Li isActive={isActive("/main")}>
            <H.A href="/main">국가별 정보</H.A>
          </H.Li>
          <H.Li isActive={isActive("/permission")}>
            <H.A href="/permission">입국 허가요건 정보</H.A>
          </H.Li>
          <H.Li isActive={isActive("/embassy")}>
            <H.A href="/embassy">국가별 대사관 정보</H.A>
          </H.Li>
        </H.Ul>
      </H.Nav>
      <div>
        <H.Logo src="" />
      </div>
    </H.HeaderCon>
  );
}
