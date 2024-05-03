import { type TStatisticsDamageTypesFiltersType } from '@core/types/filters/statistics-damage-types-filters'

interface TStatisticsDamageTypesFiltersFormType
    extends Omit<
        TStatisticsDamageTypesFiltersType,
        'zone_type' | 'province_ids' | 'city_ids' | 'accident_ids' | 'accident_center_ids'
    > {}

export default TStatisticsDamageTypesFiltersFormType
