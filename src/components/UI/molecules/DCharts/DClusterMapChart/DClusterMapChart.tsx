/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC, useEffect, useState } from 'react'
import axios from 'axios'
import Highcharts, {
    type DrilldownCallbackFunction,
    type DrilldownEventObject,
    type GeoJSON,
    type TooltipFormatterContextObject,
} from 'highcharts/highmaps'
import highchartsDrilldown from 'highcharts/modules/drilldown'
import HighchartsExporting from 'highcharts/modules/exporting'
import HCofflineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'

import { DLoading } from '@atoms/DLoading'

import { STATIC_CITIES_DATA, STATIC_PROVINCES_DATA } from './resources'
import { type IDClusterMapChartProps } from './resources/types/types'

const DClusterMapChart: FC<IDClusterMapChartProps> = ({ colors = ['#E6EFFF', '#BEDAFF', '#6AA1FF', '#165DFF'] }) => {
    const [provincesGeojson, setProvincesGeojson] = useState<GeoJSON | object>({})
    const [citiesGeojson, setCitiesGeojson] = useState<GeoJSON | object>({})

    const baseUrl =
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://front.bonyad360.dornicaapi.ir'

    const [citiesLoading, setCitiesLoading] = useState(true)
    const [provinceLoading, setProvinceLoading] = useState(true)

    if (typeof Highcharts === 'object') {
        highchartsDrilldown(Highcharts)
        HighchartsExporting(Highcharts)
        HCofflineExporting(Highcharts)

        Highcharts.setOptions({
            chart: {
                style: {
                    fontFamily: 'var(--font-iran-yekan)',
                },
            },
            lang: {
                thousandsSep: ',',
            },
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [provinceResponse, cityResponse] = await axios.all([
                    axios.get('geojson/province.json'),
                    axios.get('geojson/cities.json'),
                ])

                setProvincesGeojson(provinceResponse.data)
                setCitiesGeojson(cityResponse.data)
                setCitiesLoading(false)
                setProvinceLoading(false)
            } catch (error) {
                setCitiesLoading(false)
                setProvinceLoading(false)
            }
        }

        fetchData()
    }, [])

    if (citiesLoading || provinceLoading) {
        return <DLoading />
    }

    const provinceJsonData = Highcharts.geojson(provincesGeojson)
    const citiesJsonData = Highcharts.geojson(citiesGeojson)

    let clickCount = 0
    // eslint-disable-next-line no-unused-vars
    let clickTimer
    const provinceDrilldownFn: DrilldownCallbackFunction = function (e: DrilldownEventObject) {
        clickCount++

        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0
            }, 250) // Adjust the delay as needed
        } else if (clickCount === 2) {
            const provinceName = e.point.properties.name
            // Filter All cities by province name - result is province cities
            const availableCities = citiesJsonData.filter((city) => city.properties.provinceName === provinceName)

            this.addSeriesAsDrilldown(e.point, {
                type: 'map',
                name: 'City Details',
                data: availableCities,
                // Set Hover Style
                states: {
                    hover: {
                        borderColor: 'black',
                        shadow: false,
                    },
                },
                // Show Name of the City
                dataLabels: {
                    enabled: true,
                    format: '',
                    style: {
                        textOutline: '1px #000',

                        fontSize: '12px',
                        color: '#fff',
                    },
                },
            })
        }
    }

    // set province Data & set pointers Drilldown
    provinceJsonData.forEach((singleProvince) => {
        singleProvince.drilldown = singleProvince.properties['OBJECTID_1']
        const provinceName = singleProvince.properties['name']
        const availableProvince = STATIC_PROVINCES_DATA.find((province) => province.name === provinceName)

        singleProvince.value = availableProvince ? availableProvince.data : 0
    })

    // set city drilldown Data
    citiesJsonData.forEach((singleCity) => {
        const cityName = singleCity.properties['name']
        const availableCity = STATIC_CITIES_DATA.find((city) => city.name === cityName)

        // generate random number between 300 - 3500
        singleCity.value = availableCity ? availableCity.data : Math.floor(Math.random() * (3500 - 300) + 300)
    })

    const options = {
        chart: {
            spacing: [50, 0, 0, 0],
            // set drilldown event after clicked on province
            events: {
                drilldown: provinceDrilldownFn,
            },
            animation: false,
        },

        title: {
            text: '',
        },

        // custom legend
        colorAxis: {
            dataClasses: [
                {
                    name: 'کمتر از 500',
                    to: 500,
                    color: colors[0],
                },
                {
                    name: 'از 500 تا 1000',
                    from: 500,
                    to: 1000,
                    color: colors[1],
                },
                {
                    name: 'از 1000 تا 2000',
                    from: 1000,
                    to: 2000,
                    color: colors[2],
                },
                {
                    name: 'بیشتر از 2000',
                    from: 2000,
                    color: colors[3],
                },
            ],
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
                    y: -20,
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
        credits: {
            enabled: false,
        },

        mapNavigation: {
            enabled: true,
            enableDoubleClickZoom: false,

            buttonOptions: {
                align: 'right',
                verticalAlign: 'top',
                x: -10,
            },
        },

        plotOptions: {
            map: {
                nullColor: '#bbbbbb',
                borderColor: '#ffffff',
                states: {
                    // when hover active
                    hover: {
                        borderColor: '#fff',
                        borderWidth: 1,
                    },

                    // when hover inactive
                    inactive: {
                        opacity: 1,
                        borderColor: '#fff',
                        borderWidth: 1,
                    },
                },
            },
        },
        series: [
            {
                name: 'ایران',
                data: provinceJsonData,
                // Set Hover Style
                states: {
                    hover: {
                        borderColor: 'black',
                        shadow: false,
                    },
                },
                // set drilldown event after clicked on province
                events: {
                    drilldown: provinceDrilldownFn,
                },
                // Show/Style Name of the Province
                dataLabels: {
                    enabled: true,
                    format: '',
                    style: {
                        textOutline: '1px #000',
                        fontSize: '12px',
                    },
                },
            },
        ],

        tooltip: {
            useHTML: true,
            formatter: function (this: TooltipFormatterContextObject) {
                return `
                        <div class="font-iran-yekan py-1 px-2 ">
                            <span >${this.key}:</span>
                            <span >${this.point.value}</span>
                        </div>
                    `
            },
            shadow: false,
            borderWidth: 1,
            borderColor: '#ccc',
        },
        drilldown: {
            // style name
            activeDataLabelStyle: {
                color: '#ffffff',
                fontSize: '12px',
                textDecoration: 'none',
                textOutline: '1px #000',
            },
        },
        legend: {
            reversed: true,
            verticalAlign: 'top',
            align: 'right',
        },
        accessibility: {
            enabled: false,
        },
    }

    return (
        <div className='grid'>
            <HighchartsReact constructorType='mapChart' highcharts={Highcharts} options={options} />
        </div>
    )
}

export default DClusterMapChart
