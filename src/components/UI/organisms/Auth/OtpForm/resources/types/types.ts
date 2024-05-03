import { type Dispatch, type SetStateAction } from 'react'

interface IOtpFormProps {
    otp: string | undefined
    setOtp: Dispatch<SetStateAction<string | null>>
}

type TOtpFormFormType = {
    otp: string
}

export type { TOtpFormFormType, IOtpFormProps }
