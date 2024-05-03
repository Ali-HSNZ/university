import React, { type FC } from 'react'

import { DChart } from '@atoms/DChart'

import { type IDAreaChartProps } from './resources'

const DAreaChart: FC<IDAreaChartProps> = ({ xAxisData, type = 'area', seriesData, height = 450 }) => {
    return (
        <DChart
            options={{
                chart: {
                    type,
                    height: height,
                    spacing: [50, 10, 10, 10],
                },
                accessibility: {
                    enabled: false, // Set this to true to enable accessibility features
                },
                title: {
                    text: '',
                },
                xAxis: {
                    categories: xAxisData,
                    // show all xaxis labels
                    startOnTick: true,
                    endOnTick: true,
                    tickmarkPlacement: 'on',
                    // show all xaxis labels
                    labels: {
                        style: {
                            color: '#706E6E',
                            fontSize: '12px',
                            fontWeight: '400',
                        },
                    },
                    lineColor: '#E5E6EB',
                },
                yAxis: [
                    {
                        minRange: 1,
                        labels: {
                            style: {
                                color: '#706E6E',
                                fontSize: '12px',
                                fontWeight: '400',
                            },
                        },
                        title: {
                            text: ' ',
                            style: {
                                fontWeight: '400',
                                color: '#3AA0FF',
                                fontSize: '14px',
                            },
                        },
                        gridLineDashStyle: 'Dash',
                    },
                    {
                        minRange: 1,
                        title: {
                            text: ' ',
                        },
                        labels: {
                            style: {
                                color: '#706E6E',
                                fontSize: '12px',
                                fontWeight: '400',
                            },
                        },
                        opposite: true,
                    },
                ],

                series: seriesData.map((item) => ({
                    type,
                    name: item.name,
                    data: item.data,
                    color: item.color,
                    // fillColor: {
                    //     linearGradient: {
                    //         x1: 0,
                    //         y1: 0,
                    //         x2: 0,
                    //         y2: 1,
                    //     },
                    //     stops: [
                    //         [0, `${item.color}88`],
                    //         [1, `rgba(255, 255, 255, 0.0)`],
                    //     ],
                    // },
                })),
                plotOptions: {
                    series: {
                        pointPlacement: 'on',
                    },
                    areaspline: {
                        // fill opacity color
                        fillOpacity: 0.1,
                        lineWidth: 3,
                        // disable marker point in legend symbol
                        marker: {
                            enabled: false,
                        },
                    },
                    area: {
                        // fill opacity color
                        fillOpacity: 0.1,
                        lineWidth: 3,
                        // disable marker point in legend symbol
                        marker: {
                            enabled: false,
                        },
                    },
                },
                legend: {
                    rtl: true,

                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'horizontal', // Set the legend layout to horizontal
                    itemStyle: {
                        color: '#373737',
                        fontSize: '12px',
                        fontWeight: '400',
                    },
                    symbolRadius: 0,
                },

                credits: {
                    enabled: false,
                },
            }}
        />
    )
}

export default DAreaChart
