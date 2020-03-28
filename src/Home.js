import React from 'react'
import CasesByCountry from './CasesByCountry'
import { Container } from 'react-bootstrap'
import TotalChart from './TotalChart'
import WorldTotalStatistic from './WorldTotalStatistic'
import MaskUsage from './MaskUsage'

export default () => {
  return (
    <div style={{ marginTop: '5em' }}>
      <Container>
        <TotalChart />
        {/* <MaskUsage /> */}
        <br />
        <WorldTotalStatistic />
        <br />
        <CasesByCountry />
      </Container>
    </div>
  )
}
