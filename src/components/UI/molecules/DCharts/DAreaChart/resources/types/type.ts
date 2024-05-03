import { type TCriticalAny } from '@core/types/critical-any'

interface IDAreaChartProps {
    seriesData: TCriticalAny[]
    xAxisData: string[]
    height?: number
    type?: 'area' | 'areaspline' | 'arearange' | 'streamgraph'
}
export default IDAreaChartProps
