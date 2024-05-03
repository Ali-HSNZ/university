import { type FC, useState } from 'react'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import DatePicker from 'react-multi-date-picker'
import { addMonths, addWeeks, addYears } from 'date-fns'

import { DActionIcon } from '@atoms/DActionIcon'

import { type TCriticalAny } from '@core/types/critical-any'

import {
    type IToolsProps,
    type THandleToolDateProps,
    type TRenderValueProps,
    type TValidateDateProps,
} from './resources'

const CustomDatePicker: FC = () => {
    const [selectedStartDate, setSelectedStartDate] = useState<TCriticalAny>()
    const [selectedEndDate, setSelectedEndDate] = useState<TCriticalAny>()

    const today: Date = new Date()
    const lastWeek: Date = addWeeks(new Date(), -1)
    const lastMonth: Date = addMonths(new Date(), -1)
    const lastYear: Date = addYears(new Date(), -1)

    const dateMap: TCriticalAny = {
        today,
        lastWeek,
        lastMonth,
        lastYear,
    }

    const handleToolDate: THandleToolDateProps = (type, setFunction) => {
        setFunction(dateMap[type])
    }

    const renderValue: TRenderValueProps = (value) => {
        if (!value) return 'تاریخ پایان'

        if (typeof value === 'string') {
            if (value.includes('~')) {
                return value.split('~')[1]
            }
            return value
        } else if (Array.isArray(value) && value.length >= 2) {
            return value[1]
        }

        return value[0]
    }

    const validateDate: TValidateDateProps = (end, type) => {
        if (type === 'start') {
            const endDate = new Date(end).getTime()
            const startDate = new Date(selectedEndDate).getTime()

            return !(endDate && startDate && endDate >= startDate)
        }

        const endDate = new Date(end).getTime()
        const startDate = new Date(selectedStartDate).getTime()

        return !(endDate && startDate && endDate <= startDate)
    }

    const Tools: FC<IToolsProps> = ({ type, setFunction }) => {
        const toolTypes = ['lastYear', 'lastMonth', 'lastWeek', 'today']
        return (
            <div className='flex justify-between gap-x-1 px-2 py-2'>
                {toolTypes.map((toolType) => {
                    const isValid: boolean = validateDate(dateMap[toolType].getTime(), type)
                    return (
                        <DActionIcon
                            key={toolType}
                            variant='transparent'
                            disabled={!isValid}
                            className={`text-xs font-normal ${isValid ? '' : 'bg-transparent'}`}
                            onClick={() => handleToolDate(toolType, setFunction)}
                        >
                            {toolType === 'lastYear'
                                ? 'سال اخیر'
                                : toolType === 'lastMonth'
                                  ? 'ماه اخیر'
                                  : toolType === 'lastWeek'
                                    ? 'هفته اخیر'
                                    : 'امروز'}
                        </DActionIcon>
                    )
                })}
            </div>
        )
    }

    return (
        <div className='border flex justify-between rounded-[4px] h-[30px] py-1 pb-0 px-3 border-[#D9D9D9] w-64 datePickerCustom'>
            <div className='single'>
                <DatePicker
                    value={selectedStartDate}
                    onChange={(date: TCriticalAny) => setSelectedStartDate(date)}
                    calendar={persian}
                    shadow={false}
                    maxDate={selectedEndDate}
                    render={(value, openCalendar) => (
                        <p
                            className={`text-sm select-none cursor-pointer ${value ? '' : 'text-[#BFBFBF]'} `}
                            onClick={openCalendar}
                        >
                            {value || 'تاریخ شروع'}
                        </p>
                    )}
                    onOpenPickNewDate={false}
                    calendarPosition='bottom-left'
                    locale={persian_fa}
                    plugins={[<Tools type='start' key={0} position='bottom' setFunction={setSelectedStartDate} />]}
                />
            </div>

            <div className='range'>
                <DatePicker
                    value={
                        selectedEndDate
                            ? [selectedStartDate, selectedEndDate]
                            : selectedStartDate
                              ? [selectedStartDate, null]
                              : []
                    }
                    onChange={(date: TCriticalAny) => {
                        if (date && date.length === 1) {
                            setSelectedEndDate(date[0])
                        } else {
                            setSelectedEndDate(date[1])
                        }
                    }}
                    calendar={persian}
                    render={(value, openCalendar) => (
                        <p
                            className={`text-sm select-none ${
                                !!selectedStartDate ? 'cursor-pointer' : 'cursor-not-allowed'
                            } ${value ? '' : 'text-[#BFBFBF]'}`}
                            onClick={openCalendar}
                        >
                            {renderValue(value)}
                        </p>
                    )}
                    minDate={selectedStartDate}
                    range
                    rangeHover
                    disabled={!!!selectedStartDate}
                    onOpenPickNewDate={false}
                    calendarPosition='bottom-left'
                    shadow={false}
                    locale={persian_fa}
                    plugins={[<Tools type='end' key={0} position='bottom' setFunction={setSelectedEndDate} />]}
                />
            </div>
        </div>
    )
}

export default CustomDatePicker
