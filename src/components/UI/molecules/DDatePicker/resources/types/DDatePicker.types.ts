import { type FieldErrors } from 'react-hook-form'
import { type DateObject, type DatePickerProps } from 'react-multi-date-picker'
import { type UseMutateFunction } from '@tanstack/react-query'

import { type TCriticalAny } from '@core/types/critical-any'

interface IDDatePickerProps extends Omit<DatePickerProps, 'onChange'> {
    classNames?: {
        root?: string
        input?: string
    }
    // ref?: RefObject<HTMLInputElement>
    errors?: FieldErrors | null
    fieldName?: string
    fieldValue: string | undefined
    onFieldChange: (e: string) => void
    mutationFn?: UseMutateFunction<TCriticalAny, TCriticalAny, { birthday: string }, unknown>

    maxDate?: string | number
    minDate?: string | number
    currentDate?: DateObject
}

export default IDDatePickerProps
