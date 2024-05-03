import { type TextInputProps } from '@mantine/core'

interface IDTextInputProps extends Omit<TextInputProps, 'onChange' | 'classNames' | 'type'> {
    classNames?: {
        description?: string
        error?: string
        input?: string
        label?: string
        required?: string
        root?: string
        section?: string
        wrapper?: string
    }
}

export default IDTextInputProps
