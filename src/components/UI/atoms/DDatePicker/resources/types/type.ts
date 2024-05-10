import type DateObject from 'react-date-object'
import { type Plugin } from 'react-multi-date-picker'

import { type TCriticalAny } from '@core/types/critical-any'

interface IDatePickerProps {
    ContainerClass?: string
    disableDayPicker?: boolean
    format?: string
    plugins?: (Plugin | Plugin[])[] | undefined
    withAsterisk?: boolean
    label?: string
    placeholder?: string
    onOpenPickNewDate?: boolean
    onChange?: (reg?: TCriticalAny) => void
    minDate?: string | number | Date | DateObject
    maxDate?: string | number | Date | DateObject
}

export default IDatePickerProps
