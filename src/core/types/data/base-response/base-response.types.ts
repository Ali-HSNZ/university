import { type TCriticalAny } from '@core/types/critical-any'

interface IBaseMutationFnProps {
    data: TCriticalAny[]
    message: string
    code: number
    errors?: Record<string, string>
}

export default IBaseMutationFnProps
