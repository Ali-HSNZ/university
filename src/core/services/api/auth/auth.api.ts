import axios, { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { type TLoginFormSchemaType } from '@core/types/forms-schema/login-form'

const uploadImageMutationFn = async (values: TLoginFormSchemaType) => {
    try {
        const baseUrl = baseApiUrl()
        const response = await axios.post(`${baseUrl}auth/login`, values)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default uploadImageMutationFn
