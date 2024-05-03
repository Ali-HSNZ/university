import { forwardRef } from 'react'
import { createPolymorphicComponent, NumberInput } from '@mantine/core'

import { type INumberInputProps } from './resources'

const CustomNumberInput = forwardRef<HTMLInputElement, INumberInputProps>(({ className, classNames, ...res }, ref) => {
    return (
        <NumberInput
            className={`relative ${className}`}
            classNames={{
                ...classNames,
                input: `border-typography-350 rounded-lg text-sm p-3 h-auto disabled:border-typography-100`,
            }}
            rightSection={<></>}
            ref={ref}
            {...res}
        />
    )
})

CustomNumberInput.displayName = 'NumberInput'

const DNumberInput = createPolymorphicComponent<'input', INumberInputProps>(CustomNumberInput)

export default DNumberInput
