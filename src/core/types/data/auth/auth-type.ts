interface IAuthMutationFnProps {
    data: { token: string; userType: 'admin' | 'teacher' }
    message: string
    code: number
    errors?: Record<string, string>
}

export default IAuthMutationFnProps
