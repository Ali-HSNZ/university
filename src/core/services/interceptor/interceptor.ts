import axios from 'axios'

import { type TCriticalAny } from '@core/types/critical-any'

import { getCookieStorageItem, removeCookieStorageItem } from '../storage'

axios.interceptors.response.use(
    (response: TCriticalAny) => {
        return response
    },
    async (error: TCriticalAny) => {
        // check if error is expected from backend
        try {
            if (error.response.status === 401) {
                removeCookieStorageItem('Secure-KY')
                window.location.href = '/'
            } else if (error.response.status === 403) {
                window.location.href = '/not-access'
            }
        } catch (error) {}
        return Promise.reject(error)
    }
)

// will send token to headers request ( in x-auth-token body )
axios.interceptors.request.use((config: TCriticalAny) => {
    config.headers.access_token = getCookieStorageItem('Secure-KY')
    return config
})

export default axios
