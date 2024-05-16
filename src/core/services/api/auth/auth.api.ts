import { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { Http } from '@core/services/interceptor'
import { type TLoginFormSchemaType } from '@core/types/forms-schema/login-form'

const authMutationFn = async (values: TLoginFormSchemaType) => {
    try {
        const baseUrl = baseApiUrl()
        const response = await Http.post(`${baseUrl}auth/login`, values)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default authMutationFn
