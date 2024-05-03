type TPhysicalDevelopmentPerformanceFiltersType = {
    cumulative: string // 1 | 2 ~> 1- tajamoei 2- gheyre tajamoei
    zone_type: string // 1 | 2
    province_ids: string[]
    city_ids: string[]
    accident_ids: string[]
    accident_center_ids: string[]
    accident_member_status_ids: string[]
    damage_level_ids: string[]
    possession_type_ids: string[]
    support_organization_ids: string[]
    landuse_type_ids: string[]
    // structure_type_ids: string[]
    progress_type_ids: string[]
    is_checkout: string | null // 0 | 1
    is_finalbuild: string | null // 0 | 1
    is_conex: string | null // 0 | 1
    accident_date_from: string
    accident_date_to: string
    register_date_from: string
    register_date_to: string
}

export default TPhysicalDevelopmentPerformanceFiltersType
