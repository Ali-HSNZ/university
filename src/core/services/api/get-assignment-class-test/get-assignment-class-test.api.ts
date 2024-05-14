import axios, { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

const getAssignmentClassTestFn = async (classId: string, dayCode: string, start_time: string) => {
    try {
        const baseUrl = baseApiUrl()

        const response = await axios.get(
            `${baseUrl}admin-teacher/assignment-class/lesson/${classId}/day/${dayCode}/start_time/${start_time}/test`
        )
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default getAssignmentClassTestFn
