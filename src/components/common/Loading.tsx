import styled from "@emotion/styled";
import { DotLoader } from "react-spinners";

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen = false }) => {
  return (
    <Container fullScreen={fullScreen}>
      <LoadingContent>
        <DotLoader color={"#7fa9ff"} />
        <LoadingText>잠시만 기다려주세요</LoadingText>
      </LoadingContent>
    </Container>
  );
};

export default Loading;

const Container = styled.div<{ fullScreen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => (props.fullScreen ? "100vh" : "100%")};
  position: ${(props) => (props.fullScreen ? "fixed" : "absolute")};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(
    --back-Linear,
    linear-gradient(180deg, #0a033a 0%, #040019 100%)
  );
  z-index: 1000;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoadingText = styled.p`
  color: #7fa9ff;
  font-size: 1rem;
`;
