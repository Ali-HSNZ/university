import React, { type FC } from 'react'

import { DChart } from '@atoms/DChart'
import { DScrollbar } from '@atoms/DScrollbar'

import { type IDStackedBarChartProps } from './resources/types/types'

const DStackedBarChart: FC<IDStackedBarChartProps> = ({ xAxisData, seriesData, percent = false }) => {
    return (
        <DScrollbar maxHeight={450}>
            <DChart
                options={{
                    chart: {
                        type: 'column',
                        height: 450,
                        spacing: [50, 10, 10, 10],
                    },
                    title: {
                        text: '',
                    },
                    xAxis: {
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

                        reversed: true,
                        categories: xAxisData,
                        lineColor: '#E5E6EB', // Hide the x-axis line
                    },
                    responsive: {
                        rules: [
                            {
                                condition: {
                                    maxWidth: 600,
                                },
                                chartOptions: {
                                    chart: {
                                        type: 'bar',
                                        // height: seriesData[0]?.data.length ?? 0 * 48,
                                        height: seriesData.length * seriesData[0].data.length * 8,
                                    },
                                    plotOptions: {
                                        series: {
                                            stacking: 'normal',
                                            dataLabels: {
                                                enabled: false,
                                            },
                                        },
                                    },
                                },
                            },
                        ],
                    },
                    yAxis: {
                        title: {
                            text: ' ',
                        },
                        minRange: 1,
                        labels: {
                            // autoRotation: 45,
                            distance: 10,
                            style: {
                                color: '#706E6E',
                                fontSize: '12px',
                                fontWeight: '400',
                            },
                        },
                        stackLabels: {
                            enabled: false,
                            formatter: function () {
                                return Intl.NumberFormat('en-US').format(Math.round(this.total))
                            },
                            style: {
                                fontSize: '13px',
                            },
                        },
                        gridLineDashStyle: 'Dash',
                    },

                    legend: {
                        rtl: true,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'horizontal',
                        itemStyle: {
                            color: '#373737',
                            fontSize: '12px',
                            fontWeight: '400',
                        },
                        symbolRadius: 0,
                    },
                    plotOptions: {
                        column: {
                            stacking: percent ? 'percent' : 'normal',
                            dataLabels: {
                                enabled: false,
                            },
                            borderWidth: 1,
                            minPointLength: 2,
                        },
                        bar: {
                            stacking: percent ? 'percent' : 'normal',
                            dataLabels: {
                                enabled: false,
                            },
                            borderWidth: 1,
                        },
                    },
                    series: seriesData,
                }}
            />
        </DScrollbar>
    )
}

export default DStackedBarChart
