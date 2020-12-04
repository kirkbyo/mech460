import { Box, Button, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import * as React from "react";
import { DemoView } from "../components/DemoView";

type DisplayTypes = "full-assembly" | "pcb";

function Poster() {
  const [display, setDisplay] = React.useState<DisplayTypes>("full-assembly");

  return (
    <Box w="100%" h="100%">
      <Head>
        <script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        ></script>
        <script
          noModule
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
        ></script>
      </Head>
      <Stack width="80%" margin="0 auto" justify="space-between" padding="8pt 0" isInline>
        <Text fontWeight="bold" fontSize="lg">
          {display === "full-assembly" ? "Assembly" : "Electronics"}
        </Text>
        <Stack spacing={4} isInline>
          <Button
            colorScheme="blue"
            size="sm"
            isDisabled={display === "full-assembly"}
            onClick={() => setDisplay("full-assembly")}
          >
            Switch to Full Assembly
          </Button>
          <Button
            colorScheme="orange"
            size="sm"
            isDisabled={display === "pcb"}
            onClick={() => setDisplay("pcb")}
          >
            Switch to PCB Design
          </Button>
        </Stack>
      </Stack>
      {display === "full-assembly" && (
        <DemoView
          src="/assembled-designV2.glb"
          alt="CAD of the assembled mechanism"
          cameraOrbit="-70deg 60deg 2m"
          downloadFile="/assembled-designV2.iges"
          customHeight="600px"
        >
          <button
            className="annotation-marker"
            slot="hotspot-buoyant-top"
            data-position="-0.2 0.65 -0.1"
            data-normal="-0.73 0.05 0.69"
          >
            <div className="annotation">Passive Buoyant Top</div>
          </button>
          <button
            className="annotation-marker"
            slot="hotspot-transponder"
            data-position="-0.02 0.7 0.1"
            data-normal="-0.73 0.05 0.69"
          >
            <div className="annotation">Remote Activation Transponder</div>
          </button>
          <button
            className="annotation-marker"
            slot="hotspot-release"
            data-position="0 0.4 0"
            data-normal="-0.73 0.05 0.69"
          >
            <div className="annotation">Release Mechanism</div>
          </button>
          <button
            className="annotation-marker"
            slot="hotspot-payload"
            data-position="0 0.05 0"
            data-normal="-0.73 0.05 0.69"
          >
            <div className="annotation">Payload</div>
          </button>
          <button
            className="annotation-marker"
            slot="hotspot-anchor"
            data-position="0 -0.4 0"
            data-normal="-0.73 0.05 0.69"
          >
            <div className="annotation">Anchor</div>
          </button>
        </DemoView>
      )}
      {display === "pcb" && (
        <DemoView
          src="/pcb-assembly.glb"
          alt="CAD of the PCB design"
          cameraOrbit="-70deg 60deg 2m"
          downloadFile="/pcb-assembly.iges"
          customHeight="600px"
        />
      )}
    </Box>
  );
}

export default Poster;
