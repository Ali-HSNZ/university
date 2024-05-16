import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'

const deleteTeacherClassByIdFn = async (teacherCode: number, classId: number) => {
    try {
        const baseUrl = baseApiUrl()

        const response = await Http.delete(`${baseUrl}admin-teacher/${teacherCode}/class/${classId}`)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default deleteTeacherClassByIdFn
