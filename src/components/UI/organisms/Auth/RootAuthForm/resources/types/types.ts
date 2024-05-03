import { type Dispatch, type SetStateAction } from 'react'

interface IRootAuthFormProps {
    setOtp: Dispatch<SetStateAction<string | null>>
}

type TRootAuthFormType = {
    code: string
}

export type { TRootAuthFormType, IRootAuthFormProps }
