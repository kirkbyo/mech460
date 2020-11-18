import * as React from "react";
import Head from "next/head";
import { Stack, Heading, Box, Text, Divider, Link, Image, Grid, Tag } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout";
import { DemoView } from "../components/DemoView";
import { LatexEquation } from "../components/LatexEquation";

const FrameModel = `
  f_{L_1} (R, ρ_{pvc},ρ_{air}, ρ_{water},t,m_{payload}, L_2) = 
  \\frac{m_{payload}}{4\\pi\\left[ρ_{water} R^2-ρ_{pvc} (2Rt-t^2 )-ρ_{air} (R-t)^2\\right]} 
  - 2L_2
`;

const IndexPage = () => (
  <Layout title="Underwater Retrieval System" description="MECH460/464 Capstone">
    <Head>
      <script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      ></script>
      <script
        noModule
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js"
      ></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
        integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
        crossOrigin="anonymous"
      />
    </Head>
    <Stack padding="16pt 0">
      <Heading size="lg" as="h1" fontFamily="georgia,serif">
        Underwater Retrieval System
      </Heading>
      <Heading size="sm" as="h2">
        Team 24: Andy Le, Artiom Lisin, Jessie Preteroti, Ozzie Kirkby, Angelo Lu
      </Heading>
    </Stack>
    <Text>
      The device will operate while fully submerged beneath the ice formation to avoid positional
      interferences. The device can be activated using a remotely transmitted acoustic signal and
      resurface by releasing a tethered, buoyant section of the device. This section will carry a
      microcontroller-based system with a GPS receiver and a point to point transponder to the
      surface. A handheld transponder can then be used to read where the device has surfaced,
      allowing for retrieval.
    </Text>
    <Grid templateColumns="repeat(auto-fit, minmax(320px, 1fr))" gap={0} margin="16pt 0">
      <Stack align="center">
        <Stack textAlign="center">
          <Box>
            <Tag colorScheme="orange">Operating Mode</Tag>
          </Box>
          <Text fontSize="xs" color="gray.500" height="28pt">
            The device and payload are deployed underwater and left for up to a year.
          </Text>
        </Stack>
        <Image
          src="/figures/sketch-operating-mode.png"
          alt="Sketch of the system in operating mode"
          height="500px"
        />
      </Stack>
      <Stack align="center">
        <Stack textAlign="center">
          <Box>
            <Tag colorScheme="green">Recovery Mode</Tag>
          </Box>
          <Text fontSize="xs" color="gray.500" height="28pt">
            The remote actuator has received a signal, triggering the release mechanism. The spooled
            is then undone, and the passive buoyant top floats to the surface.
          </Text>
        </Stack>
        <Image
          src="/figures/sketch-recovery-mode.png"
          alt="Sketch of the system in recovery mode"
          height="500px"
        />
      </Stack>
    </Grid>
    <Text margin="32pt 0">
      These sketches were then developed into the design below. The frame will be constructed of PVC
      due to its buoyancy capabilities when sealed with air and low-cost factor. Some of the design
      considerations and analyses are listed below.
    </Text>
    <DemoView
      src="/assembled-design.glb"
      alt="CAD of the assembled mechanism"
      cameraOrbit="-70deg 60deg 2m"
      downloadFile="/assembled-design.iges"
      customHeight="700px"
    >
      <button
        className="annotation-marker"
        slot="hotspot-buoyant-top"
        data-position="-0.35 0.65 0"
        data-normal="-0.73 0.05 0.69"
      >
        <div className="annotation">Passive Buoyant Top</div>
      </button>
      <button
        className="annotation-marker"
        slot="hotspot-transponder"
        data-position="0.35 0.62 0"
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
    <Divider marginTop="8pt" />
    <Box>
      <Heading as="h2" size="md" marginTop="8pt">
        Passive Buoyant Top
      </Heading>
      <Box>
        <Heading size="sm" as="h2">
          Release Mechanism
        </Heading>
        <Text>
          The release mechanism contains 100 m of braided rope spooled onto a rotating shaft. The
          shaft rotation is locked by a ratchet wheel and a pawl before deployment. Upon deployment,
          a waterproof servo motor will rotate the pawl to unlock the shaft; releasing the spooled
          rope.
        </Text>
        <DemoView
          src="/release-mechanism.glb"
          alt="CAD of the release mechanism"
          cameraOrbit="90deg 75deg 0.35m"
          downloadFile="/release-mechanism.IGS"
          autoRotate={false}
        />
      </Box>
      <Box marginTop="16pt">
        <Heading as="h3" size="sm">
          Surface Communication
        </Heading>
        <Stack>
          <Text>
            Two designs of the electronics were considered. The original design uses a HC-12 for
            surface communication and an ATmega328P microcontroller (MCU) for logic. The revised
            design uses a RFM96 for surface communication and an ATmega32u4 MCU. Conveniently,
            Adafruit sells a board that integrates both chips on a single prototyping board.
          </Text>
          <Text>
            Both designs use the same GPS receiver (MTK3339 on a Adafruit Ultimate GPS breakout),
            have a similar on/off latching relay and linear solenoid activation mechanisms at the
            block diagram level. Due to logic level differences between the boards containing the
            ATmega328P and the ATmega32u4, supporting components, such as resistors, transistors,
            and diodes, are changed between the designs.
          </Text>
          <Text>
            Both chips are similar in cost. The RFM96 is more flexible and has more features (i.e.
            automatic retry).
          </Text>
          <Stack padding="16pt 8pt">
            <Stack isInline align="center">
              <Text as="b" width="50%">
                HC-12
              </Text>
              <Text as="b" width="50%">
                RFM96
              </Text>
            </Stack>
            <Stack isInline align="center">
              <Text width="50%">433.4-473.0 MHz</Text>
              <Text width="50%">433 MHz</Text>
            </Stack>
            <Stack isInline align="center">
              <Text width="50%">~4Wh over 7 days, 5% active time</Text>
              <Text width="50%">~3.5Wh over 7 days, 5% active time</Text>
            </Stack>
            <Stack isInline align="center">
              <Text width="50%">~1 km range with line of sight</Text>
              <Text width="50%">
                2 km range with line of sight, 20km theoretical with directional antenna and tuning
              </Text>
            </Stack>
            <Stack isInline align="center">
              <Text width="50%">Proprietary communication protocol</Text>
              <Text width="50%">Open source communication protocol (LoRa)</Text>
            </Stack>
            <Stack isInline align="center">
              <Text width="50%">Serial bus to MCU</Text>
              <Text width="50%">SPI bus to MCU</Text>
            </Stack>
          </Stack>
          <Text>
            The ATmega328P and the ATmega32u4 both have similar software and electrical
            characteristics, and either are capable performing of what is required in this project.
            As we are utilizing a prototyping board the choice comes down to convenience, cost, and
            size. ATmega328P is the MCU in the popular Arduino Uno, the board originally chosen.
            This board is larger and more expensive than the ATmega32u4 powered Adafruit Feather
            32u4, which contains the LoRa radio selected as well. For these reasons, the ATmega32u4
            was chosen.
          </Text>
          <Image src="/figures/electrical-design.png" />
          <Text>
            As a bonus, this development board is compatible with any of the “FeatherWing” line of
            accessories at Adafruit to add features easily if needed by the researcher (e.g.
            temperature sensing, data logging, etc).
          </Text>
        </Stack>
      </Box>
      <Box marginTop="16pt">
        <Heading as="h3" size="sm">
          Battery Monitoring
        </Heading>
        <Stack>
          <Text>
            The voltage of a lithium polymer battery (LiPo) relates to the remaining discharge
            capacity of the battery through a known, temperature-dependent discharge profile. By
            monitoring the voltage of the battery, we can turn off the recovery mode electronics
            when the battery near empty to prevent damaging the LiPo through over-discharging.
          </Text>
          <Text>
            A single LiPo cell is usually designed to operate safely between 3-4.2 V. A 3 cell (3s)
            LiPo battery, which the circuit was designed for, therefore operates between 9-12.6 V.
            Using a voltage divider made of two resistors, we can create an output that in the
            supported range of the MCU’s analog to digital converters (ADC), 3.3 V in this case. To
            be safe, we will use a maximum V_in of 13 V so we can detect unsafe over-volt
            conditions.
          </Text>
        </Stack>
        <Stack isInline align="center" justify="center" spacing="8">
          <LatexEquation
            equation="V_{out} = V_{in} \times \frac{R_2}{R_1 + R_2} \rightarrow R_1 = 2.93 R_2"
            display
          />
          <Text>(1)</Text>
        </Stack>
        <Text>
          Choosing resistors with higher resistances will decrease power consumption. However, we
          are limited by the ADC on the ATmega32u4, which is “optimized for analog signals with an
          output impedance of approximately <i>10kΩ</i> or less.”
        </Text>
        <Stack isInline align="center" justify="center" spacing="8">
          <LatexEquation
            equation="\left(\frac{1}{R_1} + \frac{1}{R_2}\right) = 10k\Omega"
            display
          />
          <Text>(2)</Text>
        </Stack>
        <Text>
          Solving equations (1) and (2), we are limited to a maximum of R_1≈39.29 kΩ and R_2≈13.41
          kΩ. 13 kΩ and 39 kΩ resistors are widely available and can be used, corresponding to a
          constant draw of 0.23 mA at 12 V. Accordingly, the recovery mode electronics should be
          turned off when the ADC reads a voltage under 2.25 V.
        </Text>
      </Box>
    </Box>
    <Divider marginTop="8pt" />
    <Box>
      <Heading as="h2" size="md" marginTop="8pt">
        Payload Frame
      </Heading>
      <DemoView
        src="/payload-frame.glb"
        alt="CAD of the payload frame"
        cameraOrbit="90deg 75deg 1.5m"
        downloadFile="/payload-frame.IGS"
      />
      <Box marginTop="16pt">
        <Heading as="h3" size="sm">
          Frame Optimization
        </Heading>
        <Text paddingBottom="4pt">
          Since the payload sensor might not be buoyant, it will be held within a buoyant frame.
          This frame&apos;s size was then decided based on a buoyancy model derived from a force
          balance. Assuming that side will be a rectangular cuboid, the following model was able to
          be developed:
        </Text>
        <LatexEquation equation={FrameModel} display={true} />
        <Text paddingTop="4pt">
          where <i>R</i> is the pipe radius, <i>ρ_pvc</i> is the density of the pipes, <i>ρ_air</i>{" "}
          is the density of the gas inside the pipes, <i>ρ_water</i> is the density of the water
          that surrounds the frame, <i>t</i> is the pipe thickness, <i>m</i> payload is the maximum
          weight the frame must support, and <i>L2</i> is the lengths of the side. The following
          variables were considered to be fixed at the following values, which left only R and t as
          design variables.
        </Text>
        <Box padding="15pt">
          <Table>
            <thead>
              <tr>
                <th>Variable</th>
                <th>Description</th>
                <th>Value</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <LatexEquation equation="\rho_{pvc}" display={true} />
                </td>
                <td>Density of the PVC used</td>
                <td>1380</td>
                <td>
                  <LatexEquation equation="\frac{kg}{m^3}" display={true} />
                </td>
              </tr>
              <tr>
                <td>
                  <LatexEquation equation="\rho_{air}" display={true} />
                </td>
                <td>Density of the air sealed within the PVC</td>
                <td>0.178</td>
                <td>
                  <LatexEquation equation="\frac{kg}{m^3}" display={true} />
                </td>
              </tr>
              <tr>
                <td>
                  <LatexEquation equation="\rho_{water}" display={true} />
                </td>
                <td>Density of the water that surrounds the enclosure.</td>
                <td>997</td>
                <td>
                  <LatexEquation equation="\frac{kg}{m^3}" display={true} />
                </td>
              </tr>
              <tr>
                <td>
                  <LatexEquation equation="L2" display={true} />
                </td>
                <td>
                  Side and height of the frame. Chosen since the maximum supported diameter is 10cm.
                </td>
                <td>0.3</td>
                <td>
                  <LatexEquation equation="m" display={true} />
                </td>
              </tr>
            </tbody>
          </Table>
        </Box>
        <Text>
          This leaves only R and t, pipe radius and pipe thickness, as design variables. Since
          McMaster Car only offers PVC is distinct combinations, there is a finite set of solutions.
          Using their{" "}
          <Link href="https://www.mcmaster.com/48855K24/" color="blue.400" isExternal>
            Dark Gray Unfitted pipe <ExternalLinkIcon mx="2px" />
          </Link>
          , as the product, the following set of solutions emerges:
        </Text>
        <Image src="/figures/pipe-combinations.jpg" paddingTop="8pt" paddingBottom="8pt" />
        <Text>
          Thus, from the graph it is clear that the first four are infeasible in terms of
          practically since their lengths at those pipe specifications would all be larger than 3m
          which would be difficult for a single researcher to transport. This leaves the fifth and
          six pipes from the left, which have the following specifications.
        </Text>
        <Box padding="15pt">
          <Table>
            <thead>
              <tr>
                <th>Pipe radius [m]</th>
                <th>Pipe Thickness [m]</th>
                <th>L1 [m]</th>
                <th>Cost per 5ft</th>
                <th>Internal Pressure Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0.017</td>
                <td>0.05</td>
                <td>1.412</td>
                <td>$8.64</td>
                <td>630 psi</td>
              </tr>
              <tr>
                <td>0.021</td>
                <td>0.05</td>
                <td>0.3484</td>
                <td>$12.24</td>
                <td>520 psi</td>
              </tr>
            </tbody>
          </Table>
        </Box>
        <Text>
          Looking at the length, L1, it is clear that the sixth pipe combination is ideal, since it
          results in almost a 1m reduction of length (improving its ability to be transported). This
          increase in pipe radius comes at a larger cost and lesser internal pressure rating,
          however both do not pose any serious issues.
        </Text>
        <Box>
          <LatexEquation equation="f_{L2}(0.021, 0.005) = 0.28 m" display />
        </Box>
        <Text>
          Based on this analysis the cuboid device holder must be at least 0.35m in length and 0.28m
          in height and depth. To provide a slight safety factor and nicer dimensions to work with,
          the numbers will be rounded to 40cm and 30cm respectively.
        </Text>
      </Box>
    </Box>
  </Layout>
);

const Table = styled.table`
  border: solid 1px #ddeeee;
  border-collapse: collapse;
  border-spacing: 0;
  font: normal 13px Arial, sans-serif;
  width: 80%;
  max-width: 500px;
  text-align: left;

  thead th {
    background-color: #447eb9;
    color: white;
    padding: 10px;
  }

  tbody td {
    border: solid 1px #ddeeee;
    color: #333;
    padding: 10px;
  }

  @media only screen and (max-width: 600px) {
    & {
      width: 100%;
    }
  }
`;

export default IndexPage;
