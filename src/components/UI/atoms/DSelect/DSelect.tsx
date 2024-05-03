import { forwardRef } from 'react'
import { Select } from '@mantine/core'
import { KeyboardArrowDown } from '@mui/icons-material'

import { type IDSelectProps } from './resources'

const DSelect = forwardRef<HTMLInputElement, IDSelectProps>(
    ({ className = '', defaultWidth = false, classNames, leftSection, clearable = true, ...rest }, ref) => {
        const customRootClass = defaultWidth ? '' : 'w-full sm:w-56'

        const renderIcon = () => {
            if (clearable && rest.value) {
                return
            }
            return <KeyboardArrowDown className='text-typography' />
        }

        return (
            <Select
                rightSection={renderIcon()}
                placeholder='انتخاب کنید'
                leftSection={leftSection}
                allowDeselect={false}
                className={`relative ${className}`}
                classNames={{
                    root: `${customRootClass} ${classNames?.root ?? ''}`,
                    option: `text-xs sm:text-sm px-4 py-3 rounded-lg my-1 hover:bg-general-brandBackground
                    [&[data-checked=true]]:bg-general-brandBackground
                    [&[data-checked=true]]:font-medium
                    ${classNames?.option ?? ''}  `,
                    input: `pb-[21px] pt-[19px] px-1.5 rounded-lg border border-typography-350 text-xs sm:text-sm ${
                        classNames?.input ?? ''
                    } `,
                }}
                clearable
                withCheckIcon={false}
                {...rest}
                ref={ref}
            />
        )
    }
)

DSelect.displayName = 'DSelect'

export default DSelect
