'use client'

import { useEffect, useState } from 'react'
import persian from 'react-date-object/calendars/persian'
import persianFa from 'react-date-object/locales/persian_fa'
import DatePicker, { type DateObject } from 'react-multi-date-picker'

import { cn } from '@core/utils/common/cn'
import { convertToEnglishNumbers } from '@core/utils/common/convert-to-eng-numbers'

import { DDatePickerInput, type IDDatePickerProps, serializeCalendar } from './resources'

const DDatePicker = ({
    classNames,
    onFieldChange,
    maxDate,
    minDate,
    fieldName,
    fieldValue,
    mutationFn,
    errors,
    disabled,
    ...rest
}: IDDatePickerProps) => {
    const [calendarValue, setCalendarValue] = useState<string | undefined>()

    useEffect(() => {
        if (fieldValue && /^(?:\d{4}\/\d{2}\/\d{2})$/.test(fieldValue)) {
            setCalendarValue(fieldValue)
        } else {
            setCalendarValue(undefined)
        }
    }, [fieldValue])

    return (
        <div className={cn('relative w-full', classNames?.root)}>
            <DatePicker
                portal
                placeholder=''
                onOpenPickNewDate={false}
                calendar={persian}
                locale={persianFa}
                value={calendarValue}
                containerClassName='w-full'
                onFocusedDateChange={(e: DateObject) => {
                    const localDate = e
                        .toDate()
                        .toLocaleDateString('fa', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    const localeDateToEngNumber = convertToEnglishNumbers(localDate)
                    onFieldChange(localeDateToEngNumber)
                    if (mutationFn) {
                        mutationFn({ birthday: localeDateToEngNumber.replaceAll('/', '-') })
                    }
                }}
                render={(value, openCalendar) => (
                    <DDatePickerInput
                        onFieldChange={onFieldChange}
                        datePickerObject={{ value, openCalendar }}
                        minDate={minDate && minDate !== '//' ? minDate : '1200/01/01'}
                        maxDate={maxDate && maxDate !== '//' ? maxDate : '1600/12/30'}
                        mutationFn={mutationFn}
                        errors={errors}
                        fieldName={fieldName}
                        disabled={disabled}
                        setCalendarValue={setCalendarValue}
                    />
                )}
                disabled={disabled}
                {...rest}
                {...serializeCalendar({
                    minDate: minDate && minDate !== '//' ? minDate : '1200/01/01',
                    maxDate: maxDate && maxDate !== '//' ? maxDate : '1600/12/30',
                    fieldValue,
                })}
            />
            {/* <DateRange className='left-1.5 top-2.5  min-w-[16px] min-h-[16px] absolute pointer-events-none' /> */}
        </div>
    )
}

export default DDatePicker
