import * as React from "react";
import { DownloadIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

type Props = {
  src: string;
  alt: string;
  cameraOrbit: string;
  downloadFile: string;
};

export function DemoView({ cameraOrbit, src, alt, downloadFile }: Props) {
  return (
    <Box>
      <Demo>
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
          auto-rotate
          camera-controls
          shadow-intensity="1.0"
          exposure="0.25"
          camera-orbit={cameraOrbit}
        >
          {/* @ts-expect-error */}
        </model-viewer>
      </Demo>
    </Box>
  );
}

const DownloadContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 12pt;
  left: 12pt;
  z-index: 100;
`;

const Demo = styled.div`
  position: relative;
  height: 400px;
  width: 80%;
  margin: 0 auto;

  model-viewer {
    width: 100%;
    height: 100%;
    --progress-bar-color: #eeeeee;
  }

  @media only screen and (max-width: 600px) {
    & {
      width: 100%;
    }
  }
`;
