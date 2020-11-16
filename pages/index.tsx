import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
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
          background-color: #eee;
        }
        `}
      </style>
    </Head>
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <div className="demo">
      {/* @ts-expect-error */}
      <model-viewer src="/release-mechanism.glb" alt="A 3D model of an astronaut" auto-rotate camera-controls shadow-intensity="1.0" exposure="0.25"></model-viewer>
    </div>
  </Layout>
)

export default IndexPage
