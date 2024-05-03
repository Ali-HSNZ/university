import { type TReportsYearlyDamageLocationFiltersType } from '@core/types/filters/reports-yearly-damage-location-filters'

interface TReportsYearlyDamageLocationFiltersFormType
    extends Omit<
        TReportsYearlyDamageLocationFiltersType,
        'zone_type' | 'province_ids' | 'city_ids' | 'accident_ids' | 'accident_center_ids'
    > {}

export default TReportsYearlyDamageLocationFiltersFormType
