// import { type RefObject } from 'react'
// import { type RefCallBack } from 'react-hook-form'
import { type PinInputProps } from '@mantine/core'

import { type TCriticalAny } from '@core/types/critical-any'

// import { type TFieldErrorTypes } from '@core/types/common/field-error'

interface IDPinInputProps extends Omit<PinInputProps, 'classNames' | 'error'> {
    classNames?: {
        input?: string
        pinInput?: string
        root?: string
    }
    error?: TCriticalAny
    // error?: TFieldErrorTypes
    ref?: TCriticalAny
    // ref?: RefObject<HTMLInputElement> | RefCallBack
}

export default IDPinInputProps
