import { type TBaseInfoType } from '@core/types/api/base-info'
import { type TDistributionEventsMapFiltersType } from '@core/types/filters/distribution-events-map-filters'

interface TExtraBaseInfoType extends TBaseInfoType {
    chart_code: string
}

interface IDClusterMapChartProps {
    colors?: string[]
    clusters?: number[][]
    data: {
        id: number
        name: string
        chart_code: string
        total_count: number
    }[]
    provinces: TExtraBaseInfoType[]
    handleProvinceSwitch: (isProvince: boolean) => void
    provincesReducer: (values: string[]) => void
    filterValues?: TDistributionEventsMapFiltersType
}

export type { IDClusterMapChartProps }
