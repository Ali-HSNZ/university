import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'

const deleteTeacherByCodeFn = async (teacherCode: string) => {
    try {
        const baseUrl = baseApiUrl()

        const response = await Http.delete(`${baseUrl}admin-teacher/${teacherCode}/delete`)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default deleteTeacherByCodeFn
