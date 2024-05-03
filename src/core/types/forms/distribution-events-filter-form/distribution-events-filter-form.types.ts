import { type TDistributionEventsFiltersType } from '@core/types/filters/distribution-events-filters'

interface TDistributionEventsFiltersFormType
    extends Omit<TDistributionEventsFiltersType, 'zone_type' | 'province_ids' | 'city_ids'> {}

export default TDistributionEventsFiltersFormType
