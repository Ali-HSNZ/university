import { type FC } from 'react'
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HCofflineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'

import { type IDChartProps } from './resources'

const DChart: FC<IDChartProps> = ({ options }) => {
    if (typeof Highcharts === 'object') {
        HighchartsExporting(Highcharts)
        HCofflineExporting(Highcharts)
        Highcharts.setOptions({
            chart: {
                spacing: [50, 10, 10, 0],
                style: {
                    fontFamily: 'var(--font-iran-yekan)',
                },
            },
            credits: {
                enabled: false,
            },
            yAxis: {
                minRange: 1,
                allowDecimals: false,
                min: 0,
            },
            tooltip: {
                valueDecimals: 0,
                // outside: true,
                shared: true,
                useHTML: true,
            },
            accessibility: {
                enabled: false,
            },
            exporting: {
                enabled: true,
                accessibility: {
                    enabled: true,
                },
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
            lang: {
                downloadJPEG: 'JPEG دانلود فایل',
                downloadPNG: 'PNG دانلود فایل',
                downloadSVG: 'SVG دانلود فایل',
                downloadPDF: 'PDF دانلود فایل',
                printChart: 'چاپ نمودار',
                viewFullscreen: 'نمایش تمام صفحه',
                exitFullscreen: 'خروج از نمایش تمام صفحه',
                thousandsSep: ',',
            },
        })
    }

    return (
        <div className='grid grid-cols-1'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default DChart
