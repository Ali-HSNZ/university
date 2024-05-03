import { type TCriticalAny } from '@core/types/critical-any'

type TSingleSeriesDataType = TCriticalAny

interface IBarChartProps {
    seriesData: TSingleSeriesDataType[]
    xAxisData: string[]
    height?: number | 'unset'
}
export type { IBarChartProps, TSingleSeriesDataType }
