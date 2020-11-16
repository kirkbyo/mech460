import * as React from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import { Box, Heading } from '@chakra-ui/react'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example" description="MECH460/464 Capstone">
    <Head>
      <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      <script noModule src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"></script>
      <style>
        {`
        .demo {
          height: 600px;
          width: 100%;
        }
        .demo model-viewer {
          width: 100%;
          height: 100%;
        }
        `}
      </style>
    </Head>
    <Box textAlign="center" padding="16pt">
      <Heading size="lg" as="h1">Underwater Retrieval System</Heading>
      <Heading size="sm" as="h2">Team 24: Andy Le, Artiom Lisin, Jessie Preteroti, Ozzie Kirkby, Angelo Lu</Heading>
    </Box>
    <Box marginTop="16pt">
      <Heading size="md">Release Mechanism</Heading>
      <div className="demo">
        {/* @ts-expect-error */}
        <model-viewer src="/release-mechanism.glb" alt="A 3D model of an astronaut" auto-rotate camera-controls shadow-intensity="1.0" exposure="0.25"></model-viewer>
      </div>
    </Box>
  </Layout>
)

export default IndexPage
