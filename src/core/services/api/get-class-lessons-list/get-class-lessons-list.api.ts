import axios, { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

const getClassValidLessonsListFn = async () => {
    try {
        const baseUrl = baseApiUrl()

        const response = await axios.get(`${baseUrl}admin-class/lessons/list`)
        return response.data.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default getClassValidLessonsListFn
