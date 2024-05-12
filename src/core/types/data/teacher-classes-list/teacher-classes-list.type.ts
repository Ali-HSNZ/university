type TTeacherSingleClassType = {
    id: number
    title: string
    start_time: string
    end_time: string
    day: string
    test_date: string
    test_time: string
    first_name: string
    last_name: string
}

type TTeacherClassesListType = {
    classes: TTeacherSingleClassType[]
    teacher: {
        first_name: string
        last_name: string
        teacher_code: number
    }
}

export type { TTeacherClassesListType, TTeacherSingleClassType }
