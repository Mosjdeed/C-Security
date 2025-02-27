import React from 'react';
import ReactApexChart from 'react-apexcharts';

const EnergyUsageChart = () => {
    const chartOptions = {
        chart: {
            type: 'radialBar',
            height: 350,
            background: 'transparent'
        },
        plotOptions: {
            radialBar: {
                startAngle: -180,
                endAngle: 0,
                hollow: {
                    margin: 0,
                    size: '65%',
                },
                track: {
                    show: true,
                    background: "#f8f9fa",
                    strokeWidth: '100%',
                    opacity: 1,
                    margin: 5,
                    dropShadow: {
                        enabled: false
                    }
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '16px',
                        color: '#888',
                        offsetY: -10
                    },
                    value: {
                        show: true,
                        fontSize: '24px',
                        color: '#333',
                        offsetY: 10
                    },
                    total: {
                        show: true,
                        label: 'July',
                        formatter: function () {
                            return '2,569 Kwh';
                        }
                    }
                }
            }
        },
        colors: ['#FF9F43', '#54CED5', '#2E5BFF', '#50D1AA'],
        series: [60, 15, 15, 10],
        labels: ['Office', 'Kitchen', 'Bedroom', 'Bathroom'],
        stroke: {
            lineCap: 'butt',
            width: 5,
        },
        legend: {
            show: false
        }
    };

    return (
        <div className="col-xxl-4 col-sm-6">
            <div className="card shadow-sm h-100">
                <div className="card-body p-4">
                    <h6 className="fw-bold mb-4 fs-4">Device Usage Distribution</h6>
                    <div className="position-relative">
                        <ReactApexChart 
                            options={chartOptions}
                            series={[60, 15, 15, 10]}
                            type="radialBar"
                            height={300}
                        />
                        <div className="d-flex justify-content-start gap-4 mt-3">
                            {['Device ', 'Email ', 'File operations', 'External communications'].map((label, index) => (
                                <div key={label} className="d-flex align-items-center">
                                    <span className="d-inline-block me-2" 
                                          style={{
                                              width: '12px', 
                                              height: '12px', 
                                              backgroundColor: ['#FF9F43', '#54CED5', '#2E5BFF', '#50D1AA'][index],
                                              borderRadius: '2px'
                                          }}>
                                    </span>
                                    <span style={{fontSize: '14px', color: '#666'}}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyUsageChart;