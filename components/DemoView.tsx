import * as React from "react";
import { DownloadIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

type Props = {
  src: string;
  alt: string;
  customHeight: string;
  cameraOrbit: string;
  downloadFile: string;
  autoRotate?: boolean;
  children?: React.ReactElement | React.ReactElement[];
};

export const DemoView: React.FC<Props> = ({
  cameraOrbit,
  customHeight,
  src,
  alt,
  downloadFile,
  autoRotate = true,
  children,
}: Props) => {
  const [hideAnnotations, setHideAnnotations] = React.useState(false);

  const handleButtonClick = React.useCallback(() => {
    setHideAnnotations((val) => !val);
  }, []);

  return (
    <Box>
      <Demo height={customHeight}>
        <ShowAnnotationsContainer>
          {children ? (
            <Button
              size="xs"
              leftIcon={hideAnnotations ? <ViewIcon /> : <ViewOffIcon />}
              onClick={handleButtonClick}
            >
              {hideAnnotations ? "Show Annotations" : "Hide Annotations"}
            </Button>
          ) : null}
        </ShowAnnotationsContainer>
        <DownloadContainer>
          <form method="get" action={downloadFile}>
            <Button
              leftIcon={<DownloadIcon />}
              colorScheme="blue"
              variant="ghost"
              size="sm"
              type="submit"
              backgroundColor="white"
            >
              Download .igs
            </Button>
          </form>
        </DownloadContainer>
        {/* @ts-expect-error */}
        <model-viewer
          src={src}
          alt={alt}
          auto-rotate={autoRotate}
          camera-controls
          shadow-intensity="1.0"
          exposure="0.25"
          camera-orbit={cameraOrbit}
        >
          {hideAnnotations ? null : children}
          {/* @ts-expect-error */}
        </model-viewer>
      </Demo>
    </Box>
  );
};

const DownloadContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 12pt;
  left: 12pt;
  z-index: 100;
`;

const ShowAnnotationsContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 12pt;
  left: 12pt;
  z-index: 100;
`;

const Demo = styled.div<{ height?: string }>`
  position: relative;
  height: ${({ height }) => height ?? "400px"};
  width: 80%;
  margin: 0 auto;

  model-viewer {
    width: 100%;
    height: 100%;
    --progress-bar-color: #eeeeee;
  }

  .annotation-marker {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    border: none;
    background-color: white;
    border: 1.5px solid #2b6cb0;
  }

  .annotation {
    width: auto;
    white-space: nowrap;
    background-color: #ebf8ff;
    position: absolute;
    transform: translate(25px, -25px);
    border-radius: 10px;
    font-size: 8pt;
    font-weight: bold;
    color: #2b6cb0;
    padding: 4pt 8pt;
  }

  @media only screen and (max-width: 600px) {
    & {
      width: 100%;
    }
  }
`;
