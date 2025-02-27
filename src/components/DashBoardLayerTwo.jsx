import React from 'react'
import UnitCountTwo from './child/UnitCountTwo'
import RevenueGrowthOne from './child/RevenueStatisticOne'
import EarningStaticOne from './child/EarningStaticOne'
import CampaignStaticOne from './child/CampaignStaticOne'
import ClientPaymentOne from './child/ClientPaymentOne'
import CountryStatusOne from './child/SourceVisitors'
import LatestPerformanceOne from './child/LatestPerformanceOne'
import LastTransactionOne from './child/LastTransactionOne'

const DashBoardLayerTwo = () => {
  return (
    <section className="row gy-4">

      {/* UnitCountTwo */}
      <UnitCountTwo />

      {/* RevenueGrowthOne */}
      <RevenueGrowthOne />

      {/* EarningStaticOne */}
      <EarningStaticOne />

      {/* CampaignStaticOne */}
      <CampaignStaticOne />

      {/* ClientPaymentOne  */}
      <ClientPaymentOne />

      {/* CountryStatusOne */}
      <CountryStatusOne />

      {/* TopPerformanceOne */}

      {/* LatestPerformanceOne */}
      <LatestPerformanceOne />

      {/* LastTransactionOne */}
      <LastTransactionOne />
    </section>

  )
}

export default DashBoardLayerTwo