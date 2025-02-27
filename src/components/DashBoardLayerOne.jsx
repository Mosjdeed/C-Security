import React from 'react'
import SalesStatisticOne from './child/SalesStatisticOne';
import TotalSubscriberOne from './child/TotalSubscriberOne';
import UsersOverviewOne from './child/UsersOverviewOne';
import LatestRegisteredOne from './child/LatestRegisteredOne';
import TopPerformerOne from './child/TopPerformerOne';
import GeneratedContent from './child/GeneratedContent';
import UnitCountOne from './child/UnitCountOne';
import WeeklyTrendChart from './child/WeeklyTrendChart';
import EnergyUsageChart from './child/EnergyUsageChart';



const DashBoardLayerOne = () => {

    return (
        <>
            {/* UnitCountOne */}
            <UnitCountOne />

            <section className="row gy-4 mt-1">

                {/* SalesStatisticOne */}
                <SalesStatisticOne />

                {/* TotalSubscriberOne */}
                <TotalSubscriberOne />

                {/* UsersOverviewOne */}
                <UsersOverviewOne />

                {/* LatestRegisteredOne */}
                <LatestRegisteredOne />

                {/* TopPerformerOne */}
                <TopPerformerOne />

                {/* TopCountries */}
                <EnergyUsageChart />
                {/* TopCountries */}
                <WeeklyTrendChart />
                {/* GeneratedContent */}
                <GeneratedContent />



            </section>
        </>


    )
}

export default DashBoardLayerOne