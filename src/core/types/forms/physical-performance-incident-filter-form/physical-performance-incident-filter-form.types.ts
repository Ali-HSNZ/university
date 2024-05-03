import { type TPhysicalPerformanceIncidentFiltersType } from '@core/types/filters/physical-performance-incident-filters'

interface TPhysicalPerformanceIncidentFiltersFormType
    extends Omit<
        TPhysicalPerformanceIncidentFiltersType,
        'zone_type' | 'province_ids' | 'city_ids' | 'accident_ids' | 'accident_center_ids' | 'progress_type_ids'
    > {}

export default TPhysicalPerformanceIncidentFiltersFormType
