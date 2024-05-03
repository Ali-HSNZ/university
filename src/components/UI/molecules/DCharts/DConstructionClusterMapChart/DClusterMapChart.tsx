/* eslint-disable @typescript-eslint/no-unused-vars */
import { type FC, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Highcharts, {
    type DrilldownCallbackFunction,
    type DrilldownEventObject,
    type GeoJSON,
    type TooltipFormatterContextObject,
} from 'highcharts/highmaps'
import highchartsDrilldown from 'highcharts/modules/drilldown'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting'
import HighchartsReact from 'highcharts-react-official'

import { DLoading } from '@atoms/DLoading'

import { axiosRequestHandler } from '@lib/axios'

import { useDistributionEventsMapStore } from '@core/services/stores/use-distribution-events-map-filters'
import { type TBaseInfoType } from '@core/types/api/base-info'
import { type TCriticalAny } from '@core/types/critical-any'

import { generateDataClasses } from './resources'
import { type IDClusterMapChartProps } from './resources/types/types'

type TResponseCitiesType = {
    id: number
    name: string
    total_count: number
    chart_code: string
}

const DClusterMapChart: FC<IDClusterMapChartProps> = ({
    colors = ['#E6EFFF', '#BEDAFF', '#6AA1FF', '#165DFF'],
    data,
    provinces,
}) => {
    const chartRef = useRef<TCriticalAny>()

    const { filterValues } = useDistributionEventsMapStore()

    // Find the minimum and maximum total_count values
    const minTotalCount = Math.min(...data.map((item) => item.total_count))
    const maxTotalCount = Math.max(...data.map((item) => item.total_count))

    const [provincesGeojson, setProvincesGeojson] = useState<GeoJSON | object>({})
    const [citiesGeojson, setCitiesGeojson] = useState<GeoJSON | object>({})

    const [citiesLoading, setCitiesLoading] = useState(true)
    const [provinceLoading, setProvinceLoading] = useState(true)

    if (typeof Highcharts === 'object') {
        highchartsDrilldown(Highcharts)
        HighchartsExporting(Highcharts)
        HighchartsOfflineExporting(Highcharts)
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
    const provinceDrilldownFn: DrilldownCallbackFunction = async function (e: DrilldownEventObject) {
        clickCount++
        if (clickCount === 1) {
            clickTimer = setTimeout(() => {
                clickCount = 0
            }, 250) // Adjust the delay as needed
        } else if (clickCount === 2) {
            const chart = chartRef?.current?.chart

            const provinceId = e.point.properties['OBJECTID_1']
            const province = provinces.find((province) => +province.chart_code === provinceId)

            const availableCities = citiesJsonData.filter((city) => city.properties.provinceId === provinceId)

            // render loading center of chart
            chart.showLoading('...در حال دریافت اطلاعات')

            // fetch from api
            await axiosRequestHandler({
                method: 'get',
                url: '/reconstruction-assistance/reconstruction/distributions-accidents/by-location',
                params: { ...filterValues, province_ids: [province?.id], zone_type: 2 },
            })
                .then((response) => {
                    citiesJsonData.forEach((singleCity) => {
                        const cityCode = singleCity.properties['OBJECTID_1']
                        const availableCity = response.data.find(
                            (city: TResponseCitiesType) => +city.chart_code === cityCode
                        )
                        singleCity.value = availableCity ? availableCity.total_count : 0
                    })

                    const minCount = Math.min(...response.data.map((item: TResponseCitiesType) => item.total_count))
                    const maxCount = Math.max(...response.data.map((item: TResponseCitiesType) => item.total_count))

                    // update colorAxis manually
                    chart.update(
                        {
                            colorAxis: {
                                dataClasses: generateDataClasses({
                                    minNum: minCount,
                                    maxNum: maxCount,
                                    colors,
                                }),
                            },
                        },
                        true,
                        true
                    )
                    // set drilldown
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

                    // hide loading
                    chart.hideLoading()
                })
                .catch(() => {
                    chart.hideLoading()
                    if (!province) {
                        toast.warning('استان مورد نظر یافت نشد')
                    } else {
                        toast.warning('خطا در دریافت اطلاعات')
                    }
                })
        }
    }

    const drillUpFn = () => {
        const chart = chartRef?.current?.chart

        chart.update(
            {
                colorAxis: {
                    dataClasses: generateDataClasses({
                        minNum: minTotalCount,
                        maxNum: maxTotalCount,
                        colors,
                    }),
                },
            },
            true,
            true
        )
    }

    // set province Data & set pointers Drilldown
    if (filterValues.zone_type === '1') {
        provinceJsonData.forEach((singleProvince) => {
            singleProvince.drilldown = singleProvince.properties['OBJECTID_1']
            const provinceCode = singleProvince.properties['OBJECTID_1']
            const availableProvince = data.find((province) => +province.chart_code === provinceCode)

            singleProvince.value = availableProvince ? availableProvince.total_count : 0
        })
    }

    const options = {
        chart: {
            spacing: [50, 0, 0, 0],
            // set drilldown event after clicked on province
            events: {
                drilldown: provinceDrilldownFn,
                drillup: drillUpFn,
            },
            animation: false,
        },

        title: {
            text: '',
        },

        // custom legend
        colorAxis: {
            dataClasses: generateDataClasses({
                minNum: minTotalCount,
                maxNum: maxTotalCount,
                colors,
            }),
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
                    y: -30,
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
                nullColor: '#bababa',
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
            breadcrumbs: {
                useHTML: true,
                rtl: true,
                buttonTheme: {
                    style: {
                        fontSize: '14px',
                        color: '#000',
                    },
                },
                formatter: function (e: TCriticalAny) {
                    if (e.level === 0) {
                        return ` <p>${e.levelOptions.name}</p>`
                    } else {
                        return ` <p class="font-bold">${e.levelOptions.name}</p>`
                    }
                },
                separator: {
                    style: {
                        width: 40,
                        textAlign: 'left',
                    },
                },
            },
        },
        legend: {
            rtl: true,
            verticalAlign: 'top',
            align: 'right',
            y: 10,
        },
        accessibility: {
            enabled: false,
        },
    }

    return (
        <div className='grid'>
            <HighchartsReact ref={chartRef} constructorType='mapChart' highcharts={Highcharts} options={options} />
        </div>
    )
}

export default DClusterMapChart
