import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'

const getAssignmentClassTestFn = async (classId: string, dayCode: string, start_time: string) => {
    try {
        const baseUrl = baseApiUrl()

        const response = await Http.get(
            `${baseUrl}admin-teacher/assignment-class/lesson/${classId}/day/${dayCode}/start_time/${start_time}/test`
        )
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default getAssignmentClassTestFn
