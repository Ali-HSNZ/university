import axios, { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

type TAssignClassToTeacherMutationFnType = {
    userId: number
    user_code: string
    classId: string | null | undefined
    dayCode: string | null | undefined
    start_time: string | null | undefined
}

const assignClassToTeacherMutationFn = async (values: TAssignClassToTeacherMutationFnType) => {
    try {
        const baseUrl = baseApiUrl()
        const response = await axios.post(`${baseUrl}admin-teacher/assignment-class/create`, values)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default assignClassToTeacherMutationFn
