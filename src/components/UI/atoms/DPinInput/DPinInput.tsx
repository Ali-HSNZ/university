import { forwardRef } from 'react'
import { PinInput } from '@mantine/core'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { type IDPinInputProps } from './resources'

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

const DPinInput = forwardRef<HTMLInputElement, IDPinInputProps>(
    ({ className = '', classNames, error, size = 'md', ...rest }, ref) => {
        return (
            <PinInput
                className={cn('self-start', className)}
                classNames={{
                    root: cn('justify-between w-full gap-x-2', classNames?.root),
                    input: cn('text-xl text-neutral', classNames?.input, {
                        '!border-red hover:!border-red active:!border-red !bg-light-red-300': error,
                    }),
                    pinInput: cn('grow', classNames?.pinInput),
                }}
                style={{ direction: 'ltr' }}
                size={size}
                {...rest}
                ref={ref}
            />
        )
    }
)

DPinInput.displayName = 'DPinInput'

export default DPinInput
