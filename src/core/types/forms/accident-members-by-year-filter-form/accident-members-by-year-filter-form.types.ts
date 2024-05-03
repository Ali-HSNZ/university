import { type TAccidentMembersByYearFiltersType } from '@core/types/filters/accident-members-by-year-filters'

interface TAccidentMembersByYearFiltersFormType
    extends Omit<
        TAccidentMembersByYearFiltersType,
        'zone_type' | 'province_ids' | 'city_ids' | 'accident_ids' | 'accident_center_ids'
    > {}

export default TAccidentMembersByYearFiltersFormType
