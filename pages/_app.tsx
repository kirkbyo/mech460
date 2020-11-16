import * as React from "react";
import { AppProps } from "next/app";
import { css, Global } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";

const globalStyles = css`
  body {
    background-color: #f7fafc;
    min-height: 100%;
  }
`;

function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ChakraProvider>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;