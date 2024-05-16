import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'
import { type TCreateLessonForm } from '@core/types/forms-schema/create-lesson-form'

const createLessonMutationFn = async (values: TCreateLessonForm) => {
    try {
        const baseUrl = baseApiUrl()
        const response = await Http.post(`${baseUrl}admin-lesson/create`, values)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default createLessonMutationFn
