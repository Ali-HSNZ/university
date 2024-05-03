import { type TDistributionEventsMapFiltersType } from '@core/types/filters/distribution-events-map-filters'

interface TDistributionEventsMapFiltersFormType
    extends Omit<TDistributionEventsMapFiltersType, 'zone_type' | 'province_ids'> {}

export default TDistributionEventsMapFiltersFormType
