type TDistributionEventsFiltersType = {
    zone_type: string // 1 | 2
    province_ids: string[]
    city_ids: string[]
    accident_date_from: string // 0 | 1
    accident_date_to: string // 0 | 1
}

export default TDistributionEventsFiltersType
