import React from 'react';
import ReactApexChart from 'react-apexcharts';

const WeeklyTrendChart = () => {
    const chartOptions = {
        chart: {
            type: 'area',
            height: 250,
            toolbar: { show: false },
            background: 'transparent'
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        colors: ['#FF9F43'],
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            labels: {
                style: { colors: '#999', fontSize: '12px' }
            }
        },
        yaxis: {
            min: 70,
            max: 75,
            tickAmount: 5,
            labels: {
                style: { colors: '#999', fontSize: '12px' }
            }
        },
        markers: {
            size: 4,
            colors: ['#fff'],
            strokeColors: '#FF9F43',
            strokeWidth: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 5
        }
    };

    const series = [{
        name: 'Weight',
        data: [74.8, 74.4, 74.3, 74.1, 73.8, 73.5, 73.1]
    }];

    return (
        <div className="col-xxl-4 col-sm-6">
            <div className="card shadow-sm h-100">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-end mb-3">
                        <div className="text-end">
                            <h2 className="display-6 mb-0 fs-4 fw-bold">Risk Metrics Over Time</h2>
                            <small className="text-muted"></small>
                        </div>
                    </div>
                    <ReactApexChart 
                        options={chartOptions}
                        series={series}
                        type="area"
                        height={250}
                    />
                </div>
            </div>
        </div>
    );
};

export default WeeklyTrendChart;