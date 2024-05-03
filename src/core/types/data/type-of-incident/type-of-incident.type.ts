type TSingleDataItem = {
    id: number
    code: string
    name: string
    sort: number
    is_default: boolean
    is_active: boolean
}

type TTypeOfIncidentResponseType = {
    code: number
    message: string | null
    data: TSingleDataItem[]
}

export default TTypeOfIncidentResponseType
