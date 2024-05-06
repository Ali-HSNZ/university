import { type FC } from 'react'
import persian from 'react-date-object/calendars/persian'
import persianFa from 'react-date-object/locales/persian_fa'
import DatePicker, { type DatePickerProps } from 'react-multi-date-picker'

import { type IDatePickerProps } from './resources'

const DDatePicker: FC<DatePickerProps & IDatePickerProps> = ({ withAsterisk, label, ContainerClass, ...rest }) => {
    return (
        <div className={`relative w-full ${ContainerClass}`}>
            {label && (
                <div className='flex text-sm font-medium select-none'>
                    <p className=''>{label}</p>
                    {withAsterisk && <p className='mr-1 text-[#650025]'>*</p>}
                </div>
            )}
            <DatePicker
                portal
                editable={false}
                calendar={persian}
                locale={persianFa}
                containerClassName='w-full relative'
                inputClass='w-full mt-1 outline-none px-2 py-[7.2px] relative rounded-[5px] text-sm border border-[#ced4da] disabled:border-typography-100 disabled:bg-light-gray-300'
                {...rest}
            />
            {/* <DateRange size='16' className='left-1.5 top-2.5  min-w-[16px] min-h-[16px] absolute' variant='Linear' /> */}
        </div>
    )
}

export default DDatePicker
