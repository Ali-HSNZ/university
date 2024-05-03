import { type TStatusAccidentVictimsFiltersType } from '@core/types/filters/status-accident-victims-filters'

interface TStatusAccidentVictimsFiltersFormType
    extends Omit<
        TStatusAccidentVictimsFiltersType,
        'zone_type' | 'province_ids' | 'city_ids' | 'accident_ids' | 'accident_center_ids'
    > {}

export default TStatusAccidentVictimsFiltersFormType
