import { type FC } from 'react'

import { DChart } from '@atoms/DChart'
import { DScrollbar } from '@atoms/DScrollbar'

import { type IBarChartProps } from './resources'

const DBarChart: FC<IBarChartProps> = ({ xAxisData, seriesData, height = 450 }) => {
    const updatedSeriesData = seriesData.map((items) =>
        items.type === 'spline'
            ? {
                  ...items,
                  color: '#FF7A00',
                  marker: {
                      enabled: false,
                  },
                  lineWidth: 2,
                  linecap: 'round',
                  yAxis: 1,
                  zIndex: 2,
                  legendSymbol: 'rectangle',
              }
            : items
    )

    const isSpline = seriesData.find((e) => e.type === 'spline')
    return (
        <DScrollbar maxHeight={450}>
            <DChart
                options={{
                    chart: {
                        type: 'column',
                        height: height,
                        spacing: [50, 10, 10, 10],
                    },
                    title: {
                        text: '',
                    },
                    plotOptions: {
                        column: {
                            minPointLength: 2,
                        },
                    },

                    xAxis: {
                        labels: {
                            style: {
                                color: '#706E6E',
                                fontSize: '12px',
                                fontWeight: '400',
                            },
                        },
                        categories: xAxisData,
                        // show all xaxis labels
                        startOnTick: true,
                        endOnTick: true,
                        tickmarkPlacement: 'on',
                        // show all xaxis labels
                        reversed: true,
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
                                        height: seriesData.length * seriesData[0].data.length * 32,
                                    },
                                },
                            },
                        ],
                    },
                    tooltip: { shared: true },
                    yAxis: [
                        {
                            minRange: 1,
                            title: {
                                text: ' ',
                                // enabled: false,
                            },
                            gridLineDashStyle: 'Dash',
                            labels: {
                                style: {
                                    color: '#706E6E',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                },
                            },
                        },
                        {
                            title: {
                                text: ' ',
                                // enabled: false,
                            },
                            minRange: 1,
                            opposite: true,
                            labels: {
                                style: {
                                    color: '#706E6E',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                },
                                formatter: function () {
                                    return this.value + '%'
                                },
                            },

                            min: 0,
                            max: 100,
                            gridLineDashStyle: 'Dash',
                            visible: isSpline ? true : false,
                        },
                    ],

                    series: updatedSeriesData,
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
        </DScrollbar>
    )
}

export default DBarChart
