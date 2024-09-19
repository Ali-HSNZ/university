import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'

const teacherBulkCreateClassMutationFn = async (file: File) => {
    try {
        const formData = new FormData()
        formData.append('file', file)

        const baseUrl = baseApiUrl()
        const response = await Http.post(`${baseUrl}teacher-class/assign`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default teacherBulkCreateClassMutationFn
