import React, { ReactNode } from "react";
import Head from "next/head";
import styled from "@emotion/styled";

type Props = {
  children?: ReactNode;
  title: string;
  description: string;
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 1000px;
  position: relative;
  box-sizing: border-box;
  padding: 24pt;
  margin: 0 auto;
  background-color: white;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  height: 2rem;
`;

const Content = styled.div`
  padding-bottom: 2rem;
`;

const Layout = ({ children, title, description }: Props) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav></nav>
    </header>
    <Content>{children}</Content>
    <Footer></Footer>
  </Container>
);

export default Layout;
