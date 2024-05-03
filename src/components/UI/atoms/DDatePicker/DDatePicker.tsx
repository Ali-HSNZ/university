import { type FC } from 'react'
import persian from 'react-date-object/calendars/persian'
import persianFa from 'react-date-object/locales/persian_fa'
import DatePicker, { type DatePickerProps } from 'react-multi-date-picker'

import { type IDatePickerProps } from './resources'

const DDatePicker: FC<DatePickerProps & IDatePickerProps> = ({ ContainerClass, ...rest }) => {
    return (
        <div className={`relative w-full ${ContainerClass}`}>
            <DatePicker
                portal
                editable={false}
                onOpenPickNewDate={false}
                calendar={persian}
                locale={persianFa}
                containerClassName='w-full relative'
                inputClass='w-full outline-none p-3 relative rounded-lg text-sm border border-typography-350 disabled:border-typography-100 disabled:bg-light-gray-300'
                {...rest}
            />
            {/* <DateRange size='16' className='left-1.5 top-2.5  min-w-[16px] min-h-[16px] absolute' variant='Linear' /> */}
        </div>
    )
}

export default DDatePicker
