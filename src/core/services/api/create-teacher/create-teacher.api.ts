import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'
import { type TCreateTeacherForm } from '@core/types/forms-schema/create-teacher-form'

const createTeacherMutationFn = async (values: TCreateTeacherForm) => {
    try {
        const baseUrl = baseApiUrl()
        const response = await Http.post(`${baseUrl}admin-teacher/create`, values)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default createTeacherMutationFn
