import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'

const getClassesListFn = async () => {
    try {
        const baseUrl = baseApiUrl()

        const response = await Http.get(`${baseUrl}admin-class/list`)
        return response.data.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default getClassesListFn
