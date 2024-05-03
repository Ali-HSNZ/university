'use client'

import { forwardRef } from 'react'
import { createPolymorphicComponent, TextInput } from '@mantine/core'

import { type IDTextInputProps } from './resources'

const CustomInput = forwardRef<HTMLInputElement, IDTextInputProps>(
    ({ classNames, leftSection, placeholder = '', ...rest }, ref) => {
        return (
            <TextInput
                leftSection={leftSection}
                autoComplete='off'
                placeholder={placeholder}
                classNames={{
                    ...classNames,
                }}
                {...rest}
                ref={ref}
            />
        )
    }
)

CustomInput.displayName = 'DTextInput'

const DTextInput = createPolymorphicComponent<'input', IDTextInputProps>(CustomInput)

export default DTextInput
