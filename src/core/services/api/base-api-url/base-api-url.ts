const baseApiUrl = () => {
    if (process.env.NODE_ENV === 'development') return process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL
    else return process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL
}
export default baseApiUrl
