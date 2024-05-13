import axios, { AxiosError } from 'axios'

import { baseApiUrl } from '@api/base-api-url'

import { type TCreateClassFormType } from '@core/types/forms-schema/create-class-form'

const createClassMutationFn = async (values: TCreateClassFormType) => {
    try {
        const baseUrl = baseApiUrl()
        const response = await axios.post(`${baseUrl}admin-class/create`, values)
        return response.data
    } catch (error) {
        if (error instanceof AxiosError) return Promise.reject(error.response?.data || error)
        return error
    }
}

export default createClassMutationFn
