import axios, { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

const getTeachersListFn = async () => {
    try {
        const baseUrl = baseApiUrl()

        const response = await axios.get(`${baseUrl}admin-teacher/teachers/list`)
        return response.data.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default getTeachersListFn