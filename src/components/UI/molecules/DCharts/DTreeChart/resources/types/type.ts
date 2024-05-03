type TSingleTreeChartSeriesType = {
    name: string
    value: number
    color?: string
}

interface ITreeChartProps {
    seriesData: TSingleTreeChartSeriesType[]
}
export type { ITreeChartProps, TSingleTreeChartSeriesType }
