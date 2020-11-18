import { Box } from "@chakra-ui/react";
import katex from "katex";
import * as React from "react";

type Props = {
  equation: string;
  display?: boolean;
};

export function LatexEquation({ equation, display = false }: Props) {
  return (
    <Box overflow="scroll">
      <div
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(equation, { displayMode: display }),
        }}
      ></div>
    </Box>
  );
}
