import { type FC, useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts'
import ChartModuleMore from 'highcharts/highcharts-more.js'
import HCSoldGauge from 'highcharts/modules/solid-gauge'
import HighchartsReact from 'highcharts-react-official'

import { type TCriticalAny } from '@core/types/critical-any'

import { type IDGuageChartProps } from './resources'

ChartModuleMore(Highcharts)
HCSoldGauge(Highcharts)

const DGuageChart: FC<IDGuageChartProps> = ({ series }) => {
    const chartRef = useRef(null)

    const [currentDataIndex, setCurrentDataIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            // Update the current data index every 2 seconds
            setCurrentDataIndex((prevIndex) => (prevIndex + 1) % series.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [series])

    Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'var(--font-iran-yekan)',
            },
        },
        tooltip: {
            valueDecimals: 2,
        },
        lang: {
            thousandsSep: ',',
        },
    })

    const options = {
        chart: {
            height: 250,
            type: 'solidgauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
        },
        credits: {
            enabled: false,
        },
        title: {
            text: '',
        },
        condition: {
            maxWidth: 0,
        },
        tooltip: {
            enabled: false,
            animation: false,
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            useHTML: true,
            formatter: function (this: TCriticalAny) {
                return `<div class='text-center items-center gap-1 mt-8'>
                    <div class='font-bold' style='color:${this.color}'>${this.series.name}</div>
                    <div>${this.y}%</div>
                </div>`
            },
            positioner: function (labelWidth: TCriticalAny) {
                return {
                    x: ((this as TCriticalAny).chart.chartWidth - labelWidth) / 2,
                    y: (this as TCriticalAny).chart.plotHeight / 2 + 30,
                }
            },
        },

        pane: {
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '85%'],
            size: '250%',
            background: null,
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: [],
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: true,
                    animation: { defer: 0 },
                    borderWidth: 0,
                    backgroundColor: 'none',
                    shadow: false,
                    useHTML: true,
                    verticalAlign: 'bottom',
                    y: 20,
                    formatter: function () {
                        const currentData = series[currentDataIndex].data[0]
                        return `<div class='text-center items-center gap-1 mt-8'>
                            <div class='font-bold text-sm' style='color:${currentData.color}'>${series[currentDataIndex].name}</div>
                            <div class="text-sm">${currentData.y}%</div>
                        </div>`
                    },
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true,
            },
        },

        series: series,

        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 350,
                    },
                    chartOptions: {
                        chart: {
                            height: 180,
                        },
                        tooltip: {
                            positioner: function (labelWidth: TCriticalAny) {
                                return {
                                    x: ((this as TCriticalAny).chart.chartWidth - labelWidth) / 2,
                                    y: (this as TCriticalAny).chart.plotHeight / 2 + 10,
                                }
                            },
                        },
                    },
                },
            ],
        },
    }

    return (
        <div className='grid'>
            <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
        </div>
    )
}

export default DGuageChart
