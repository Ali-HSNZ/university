import { type FC } from 'react'
import Highcharts from 'highcharts'
import HCofflineExporting from 'highcharts/modules/offline-exporting'
import HighchartsTreemap from 'highcharts/modules/treemap'

import { DChart } from '@atoms/DChart'

import { type TCriticalAny } from '@core/types/critical-any'

import { type ITreeChartProps } from './resources'

// Initialize the treemap module
if (typeof Highcharts === 'object') {
    HighchartsTreemap(Highcharts)
    HCofflineExporting(Highcharts)
}

const DTreeChart: FC<ITreeChartProps> = ({ seriesData }) => {
    return (
        <DChart
            options={{
                chart: {
                    type: 'treemap',
                    spacing: [50, 10, 10, 10],
                    events: {
                        load: function () {
                            const points = this.series[0].points
                            points.forEach(function (point: TCriticalAny) {
                                if (
                                    point.shapeArgs &&
                                    point.dataLabel &&
                                    (point.shapeArgs.width < point.dataLabel.width ||
                                        point.shapeArgs.height < point.dataLabel.height)
                                ) {
                                    point.dataLabel.hide()
                                }
                            })
                        },
                        redraw: function () {
                            const points = this.series[0].points
                            points.forEach(function (point: TCriticalAny) {
                                if (
                                    point.shapeArgs &&
                                    point.dataLabel &&
                                    (point.shapeArgs.width < point.dataLabel.width ||
                                        point.shapeArgs.height < point.dataLabel.height)
                                ) {
                                    point.dataLabel.hide()
                                }
                            })
                        },
                    },
                },
                title: {
                    text: '',
                },
                plotOptions: {
                    treemap: {
                        colorByPoint: true,
                    },
                },
                exporting: {
                    enabled: true,
                    allowHTML: true,
                    buttons: {
                        contextButton: {
                            menuItems: ['viewFullscreen', 'printChart', 'downloadPNG', 'downloadJPEG', 'downloadSVG'],
                            symbol: ``,
                            x: 0,
                            y: -40,
                            text: '<span class="font-semibold text-general-brand bg-general-brandBackground p-2.5 rounded-lg border border-general-brand">خروجی نمودار</span>',
                            align: 'left',
                            useHTML: true,
                        },
                    },
                },
                series: [
                    {
                        type: 'treemap',
                        data: seriesData,
                        layoutAlgorithm: 'squarified',
                        layoutStartingDirection: 'vertical',
                        dataLabels: {
                            useHTML: true, // is important!
                            align: 'right',
                            style: {
                                color: '#fff',
                                fontSize: '12px',
                                fontWeight: '500',
                            },
                            allowOverlap: false,
                            verticalAlign: 'top',
                            formatter: function () {
                                let total = 0
                                for (let i = 0; i < (this as TCriticalAny).series.data.length; i++) {
                                    if ((this as TCriticalAny).series.data[i].node.children.length == 0)
                                        total += (this as TCriticalAny).series.data[i].node.val
                                }
                                let value
                                if ((this as TCriticalAny).point.node.children.length == 0) {
                                    value = (this as TCriticalAny).point.options.value
                                } else {
                                    value = (this as TCriticalAny).point.node.childrenTotal
                                }
                                return `<div class='text-xs top-1 flex flex-col truncate gap-1 text-right '>
                                    <div>${(this as TCriticalAny).key}</div>
                                    <div>${((value / total) * 100).toFixed(1)}%</div>
                                </div>`
                            },
                        },
                    },
                ],

                credits: {
                    enabled: false,
                },
            }}
        />
    )
}

export default DTreeChart
