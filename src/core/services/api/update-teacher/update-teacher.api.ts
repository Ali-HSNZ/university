import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'
import { type TUpdateTeacherForm } from '@core/types/forms-schema/update-teacher-profile-form'

const updateTeacherMutationFn = async (id: string, values: TUpdateTeacherForm) => {
    try {
        const baseUrl = baseApiUrl()
        const response = await Http.put(`${baseUrl}admin-teacher/${id}/update`, values)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default updateTeacherMutationFn
