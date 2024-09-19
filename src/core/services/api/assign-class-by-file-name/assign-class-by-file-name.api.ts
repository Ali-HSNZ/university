import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'

const assignClassByFileNameFn = async ({ fileName, fileId }: { fileName: string; fileId: number }) => {
    try {
        const baseUrl = baseApiUrl()

        const response = await Http.put(`${baseUrl}admin-class/assign-by-file/${fileName}/${fileId}`)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default assignClassByFileNameFn
