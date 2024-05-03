type TReconstructionProgressTypesByAccidentType = {
    id: number
    name: string
    progresses: {
        progress_id: string
        progress_name: string
        progress_is_default: boolean
        progress_count: number
    }[]
}

export default TReconstructionProgressTypesByAccidentType
