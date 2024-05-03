type TAccidentMembersAccidentTypeStatusType = {
    id: number
    name: string
    damages: {
        accident_type_id: string
        accident_type_name: string
        accident_type_count: number
    }[]
}

export default TAccidentMembersAccidentTypeStatusType
