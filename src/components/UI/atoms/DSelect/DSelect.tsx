import { forwardRef } from 'react'
import { Select } from '@mantine/core'
import { IconLoader2, IconSelector } from '@tabler/icons-react'

import { type IDSelectProps } from './resources'

const DSelect = forwardRef<HTMLInputElement, IDSelectProps>(({ isLoading, classNames, ...rest }, ref) => {
    return (
        <Select
            placeholder={isLoading ? 'در حال دریافت اطلاعات' : 'انتخاب کنید'}
            allowDeselect={false}
            classNames={{
                root: ` ${classNames?.root ?? ''}`,
                option: `text-xs sm:text-sm px-4 py-3  my-1 hover:bg-general-brandBackground
                    [&[data-checked=true]]:bg-general-brandBackground
                    [&[data-checked=true]]:font-medium
                    ${classNames?.option ?? ''}  `,
                input: `pb-[21px] pt-[19px] px-1.5   text-xs sm:text-sm ${classNames?.input ?? ''} `,
            }}
            rightSection={
                isLoading ? (
                    <IconLoader2 className='animate-spin text-gray-500' size={20} stroke={1.5} />
                ) : (
                    <IconSelector className='text-gray-500' size={20} stroke={1.5} />
                )
            }
            withCheckIcon={false}
            {...rest}
            ref={ref}
        />
    )
})

DSelect.displayName = 'DSelect'

export default DSelect
