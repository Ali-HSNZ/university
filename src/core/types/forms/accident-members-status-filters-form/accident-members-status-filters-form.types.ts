import { type TStatisticsApplicantsPositionFiltersType } from '@core/types/filters/statistics-applicants-position-filters'

interface TAccidentMembersStatusFiltersFormType
    extends Omit<
        TStatisticsApplicantsPositionFiltersType,
        'zone_type' | 'province_ids' | 'city_ids' | 'accident_ids' | 'accident_center_ids'
    > {}

export default TAccidentMembersStatusFiltersFormType
