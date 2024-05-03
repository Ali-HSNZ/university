'use client'

import { type FocusEventHandler, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment-jalaali'
import { InputMask } from '@react-input/mask'

import { DTextInput } from '@atoms/DTextInput'

import { convertToEnglishNumbers } from '@core/utils/common/convert-to-eng-numbers'

import { handleMouseDown, type IDDatePickerInputProps, serializeInputValue } from './resources'

const DDatePickerInput = ({
    onFieldChange,
    fieldName,
    datePickerObject: { value, openCalendar },
    minDate,
    maxDate,
    mutationFn,
    errors,
    ...rest
}: IDDatePickerInputProps) => {
    const DEFAULT_INPUT_MASKED_VALUE = '____/__/__'
    const [inputValue, setInputValue] = useState<string>(DEFAULT_INPUT_MASKED_VALUE)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputRef && inputRef.current) {
            const val = convertToEnglishNumbers(value.toString())
            const formattedValue = val.split('/')
            formattedValue[0] = formattedValue[0].padStart(4, '0')
            const joinedValue = formattedValue.join('/')
            if (/^(?:\d{4}\/\d{2}\/\d{2})$/.test(joinedValue)) {
                setInputValue(joinedValue)
                onFieldChange(joinedValue)
            } else {
                setInputValue(DEFAULT_INPUT_MASKED_VALUE)
            }
        }
    }, [onFieldChange, value])

    useEffect(() => {
        if (errors && fieldName) {
            const errorFields = Object.keys(errors)
            if (errorFields && errorFields.length > 0 && errorFields[0] === fieldName) {
                inputRef?.current?.focus()
                openCalendar()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors])

    const onInputValueChange = (value: string) => {
        try {
            const rawValue = value.replaceAll('_', '').replaceAll(' ', '').replaceAll('-', '')
            serializeInputValue(value, inputRef, setInputValue)
            const DdValue = value.substring(8, 10)
            const isWrongDayFormat = !((+DdValue || +DdValue === 0) && !/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/.test(DdValue))

            if (isWrongDayFormat && /^(?:\d{4}\/\d{2}\/\d{2})$/.test(rawValue)) {
                const rawValueToDate = moment(rawValue, 'jYYYY/jM/jD').toDate()
                const isValidGregorianYear = rawValueToDate.getFullYear()
                if (isValidGregorianYear !== 0) {
                    const isMinDateAvailable = minDate && minDate !== '//'
                    const isMaxDateAvailable = maxDate && maxDate !== '//'

                    if (isMinDateAvailable && isMaxDateAvailable) {
                        const minDateToDate =
                            typeof minDate === 'number'
                                ? moment(new Date(minDate)).toDate()
                                : moment(minDate, 'jYYYY/jM/jD').add(23, 'hours').toDate()

                        const maxDateToDate =
                            typeof maxDate === 'number'
                                ? moment(new Date(maxDate)).toDate()
                                : moment(maxDate, 'jYYYY/jM/jD').subtract(23, 'hours').toDate()

                        if (minDateToDate < rawValueToDate && rawValueToDate < maxDateToDate) {
                            onFieldChange(rawValue)
                            if (mutationFn) {
                                mutationFn({ birthday: rawValue.replaceAll('/', '-') })
                            }
                        } else {
                            toast.warning('تاریخ وارد شده خارج از بازه مجاز می باشد')
                            onFieldChange('//')
                            setInputValue(DEFAULT_INPUT_MASKED_VALUE)
                        }
                    } else if (!isMinDateAvailable && !isMaxDateAvailable) {
                        onFieldChange(rawValue)
                        if (mutationFn) {
                            mutationFn({ birthday: rawValue.replaceAll('/', '-') })
                        }
                    } else if (isMinDateAvailable && !isMaxDateAvailable) {
                        const minDateToDate =
                            typeof minDate === 'number'
                                ? moment(new Date(minDate)).toDate()
                                : moment(minDate, 'jYYYY/jM/jD').add(1, 'days').toDate()

                        if (rawValueToDate < minDateToDate) {
                            toast.warning('تاریخ وارد شده از حداقل تاریخ مجاز کمتر است')
                            onFieldChange('//')
                        } else {
                            onFieldChange(rawValue)
                            if (mutationFn) {
                                mutationFn({ birthday: rawValue.replaceAll('/', '-') })
                            }
                        }
                    } else if (!isMinDateAvailable && isMaxDateAvailable) {
                        const maxDateToDate =
                            typeof maxDate === 'number'
                                ? moment(new Date(maxDate)).toDate()
                                : moment(maxDate, 'jYYYY/jM/jD').subtract(1, 'days').toDate()
                        if (rawValueToDate > maxDateToDate) {
                            toast.warning('تاریخ وارد شده از حداکثر تاریخ مجاز بیشتر است')
                            onFieldChange('//')
                        } else {
                            onFieldChange(rawValue)
                            if (mutationFn) {
                                mutationFn({ birthday: rawValue.replaceAll('/', '-') })
                            }
                        }
                    }
                } else {
                    toast.warning('تاریخ وارد شده نامعتبر است')
                    onFieldChange('//')
                }
            } else if (rawValue === '//') {
                onFieldChange('//')
            }
        } catch (err) {
            toast.warning('تاریخ وارد شده نامعتبر است')
            onFieldChange('//')
        }
    }

    const onInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
        const rawValue = event.currentTarget.value.replaceAll('_', '').replaceAll(' ', '').replaceAll('-', '')

        if (rawValue && rawValue !== '//' && !/^(?:\d{4}\/\d{2}\/\d{2})$/.test(rawValue)) {
            onFieldChange('//')
            setInputValue(DEFAULT_INPUT_MASKED_VALUE)
        }
    }

    return (
        <DTextInput
            component={InputMask}
            showMask
            mask={DEFAULT_INPUT_MASKED_VALUE}
            replacement={{ _: /\d/ }}
            value={inputValue}
            onChange={onInputValueChange}
            onMouseDown={() => {
                handleMouseDown(inputRef)
            }}
            onFocus={() => {
                handleMouseDown(inputRef)
                openCalendar()
            }}
            onBlur={onInputBlur}
            {...rest}
            ref={inputRef}
            styles={{
                input: {
                    direction: 'ltr',
                },
            }}
        />
    )
}

export default DDatePickerInput
