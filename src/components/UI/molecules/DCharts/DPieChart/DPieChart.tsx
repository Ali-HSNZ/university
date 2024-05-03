import { type FC } from 'react'

import { DChart } from '@atoms/DChart'

import { type IPieChartProps } from './resources'

const DPieChart: FC<IPieChartProps> = ({ seriesData }) => {
    return (
        <DChart
            options={{
                chart: {
                    plotShadow: false,
                    type: 'pie',
                    spacing: [50, 10, 10, 10],
                },
                title: {
                    text: '',
                },
                tooltip: {
                    enabled: true,
                    pointFormat: '{point.y}',
                },

                legend: {
                    rtl: true,
                    enabled: true,

                    labelFormatter: function () {
                        return '<span title="' + this.name + '">' + this.name + '</span>'
                    },
                    verticalAlign: 'top',
                    align: 'right',
                    layout: 'horizontal', // Set the legend layout to horizontal
                    itemDistance: 10,
                    alignColumns: false,
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: false,
                        cursor: 'default',
                        dataLabels: {
                            useHTML: true,
                            format: '{point.percentage:.1f}%',
                            distance: -50,
                            style: {
                                textAlign: 'left',
                                color: '#fff',
                                textOutline: '0',
                                fontSize: '12px',
                                fontWeight: '400',
                            },
                            enabled: true,
                        },
                        showInLegend: true,
                    },
                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        dataLabels: [
                            {
                                enabled: true,
                                format: '{point.name:.1f}<br/>{point.percentage:.1f}%',
                            },
                        ],
                        data: seriesData,
                    },
                ],
            }}
        />
    )
}

export default DPieChart
