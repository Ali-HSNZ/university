import { type RefObject } from 'react'
import { type SelectProps } from '@mantine/core'

interface IDSelectProps extends SelectProps {
    isError?: boolean
    isLoading?: boolean
    ref?: RefObject<HTMLInputElement>
    defaultWidth?: boolean
    onChange?: (value: string | null) => void
    classNames?: {
        description?: string
        dropdown?: string
        empty?: string
        error?: string
        group?: string
        groupLabel?: string
        input?: string
        label?: string
        option?: string
        options?: string
        required?: string
        root?: string
        section?: string
        wrapper?: string
    }
}

export default IDSelectProps
