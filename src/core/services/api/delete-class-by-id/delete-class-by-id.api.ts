import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'

const deleteClassByIdFn = async (id: number) => {
    try {
        const baseUrl = baseApiUrl()

        const response = await Http.delete(`${baseUrl}admin-class/${id}/delete`)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default deleteClassByIdFn
