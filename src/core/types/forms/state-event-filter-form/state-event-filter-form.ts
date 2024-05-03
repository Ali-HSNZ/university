import { type TStateEventFiltersType } from '@core/types/filters/state-event-filters'

interface TStateEventFiltersFormType
    extends Omit<
        TStateEventFiltersType,
        'zone_type' | 'province_ids' | 'city_ids' | 'accident_ids' | 'accident_center_ids'
    > {}

export default TStateEventFiltersFormType
