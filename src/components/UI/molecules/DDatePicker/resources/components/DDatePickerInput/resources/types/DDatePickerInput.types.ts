import { type DetailedHTMLProps, type Dispatch, type HTMLAttributes, type SetStateAction } from 'react'
import { type FieldErrors } from 'react-hook-form'
import { type UseMutateFunction } from '@tanstack/react-query'

import { type TCriticalAny } from '@core/types/critical-any'

type TInputType = DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>

interface IDDatePickerInputProps extends Omit<TInputType, 'value' | 'onChange' | 'ref'> {
    disabled?: boolean
    setCalendarValue: Dispatch<SetStateAction<string | undefined>>
    fieldName?: string
    onFieldChange: (value: string) => void
    datePickerObject: {
        value: string
        openCalendar: () => void
    }
    minDate?: string | number // number in ms
    maxDate?: string | number // number in ms
    mutationFn?: UseMutateFunction<TCriticalAny, TCriticalAny, { birthday: string }, unknown>
    errors?: FieldErrors | null
}

export default IDDatePickerInputProps
