import { type TPhysicalDevelopmentPerformanceFiltersType } from '@core/types/filters/physical-development-performance-filters'

interface TPhysicalDevelopmentPerformanceFiltersFormType
    extends Omit<
        TPhysicalDevelopmentPerformanceFiltersType,
        | 'zone_type'
        | 'province_ids'
        | 'city_ids'
        | 'accident_ids'
        | 'accident_center_ids'
        | 'progress_type_ids'
        | 'cumulative'
    > {}

export default TPhysicalDevelopmentPerformanceFiltersFormType
