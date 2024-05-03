import { type TAccidentMembersReportFiltersType } from '@core/types/filters/accident-members-report-filters'

interface TAccidentMembersReportFiltersFormType
    extends Omit<
        TAccidentMembersReportFiltersType,
        'zone_type' | 'province_ids' | 'city_ids' | 'damage_level_ids' | 'accident_center_ids'
    > {}

export default TAccidentMembersReportFiltersFormType
