import { type TProvincialPerformanceFiltersType } from '@core/types/filters/provincial-performance-filter'

interface TProvincialPerformanceFiltersFormType
    extends Omit<
        TProvincialPerformanceFiltersType,
        'zone_type' | 'province_ids' | 'city_ids' | 'accident_ids' | 'accident_center_ids' | 'progress_type_ids'
    > {}

export default TProvincialPerformanceFiltersFormType
