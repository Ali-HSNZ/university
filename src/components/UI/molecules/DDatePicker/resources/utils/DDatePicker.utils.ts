import { type DateObject, toDateObject } from 'react-multi-date-picker'
import moment from 'moment-jalaali'

const serializeCalendar = ({
    minDate,
    maxDate,
    fieldValue,
}: {
    minDate?: string | number
    maxDate?: string | number
    fieldValue?: string
}) => {
    const serializedObject: {
        minDate?: string | number | Date | DateObject
        maxDate?: string | number | Date | DateObject
        currentDate?: DateObject | undefined
    } = {}

    const currentDateTime = new Date().getTime()

    const isMinDateAvailable = minDate && minDate !== '//'
    const isMaxDateAvailable = maxDate && maxDate !== '//'
    const isFieldValueUnAvailable = !fieldValue || fieldValue === '//'

    if (isMinDateAvailable && isMaxDateAvailable) {
        const minDateToDate =
            typeof minDate === 'number'
                ? moment(new Date(minDate)).toDate()
                : moment(minDate, 'jYYYY/jM/jD').add(1, 'days').toDate()

        const maxDateToDate =
            typeof maxDate === 'number'
                ? moment(new Date(maxDate)).toDate()
                : moment(maxDate, 'jYYYY/jM/jD').subtract(1, 'days').toDate()

        serializedObject.minDate = minDateToDate
        serializedObject.maxDate = maxDateToDate

        const minDateTime = minDateToDate.getTime()
        if (isFieldValueUnAvailable && minDateTime > currentDateTime) {
            serializedObject.currentDate = toDateObject(new Date(minDateTime))
        }
    }

    if (isMinDateAvailable && !isMaxDateAvailable) {
        const minDateToDate =
            typeof minDate === 'number'
                ? moment(new Date(minDate)).toDate()
                : moment(minDate, 'jYYYY/jM/jD').add(1, 'days').toDate()

        serializedObject.minDate = minDateToDate

        const minDateTime = minDateToDate.getTime()
        if (isFieldValueUnAvailable && minDateTime > currentDateTime) {
            serializedObject.currentDate = toDateObject(new Date(minDateTime))
        }
    }

    if (isMaxDateAvailable && !isMinDateAvailable) {
        const maxDateToDate =
            typeof maxDate === 'number'
                ? moment(new Date(maxDate)).toDate()
                : moment(maxDate, 'jYYYY/jM/jD').subtract(1, 'days').toDate()

        serializedObject.maxDate = maxDateToDate

        const maxDateTime = maxDateToDate.getTime()
        if (isFieldValueUnAvailable && maxDateTime < currentDateTime) {
            serializedObject.currentDate = toDateObject(new Date(maxDateTime))
        }
    }

    return serializedObject
}

const serializeBirthDateFieldCalendar = ({
    birthDateFieldFormat,
    fieldValue,
}: {
    birthDateFieldFormat?: 'owner' | 'family-member'
    fieldValue?: string
}) => {
    if (birthDateFieldFormat) {
        const serializedObject: {
            minDate?: string | number | Date | DateObject
            maxDate?: string | number | Date | DateObject
            currentDate?: DateObject | undefined
        } = {}

        const isFieldValueAvailable = fieldValue && fieldValue !== '//'

        if (birthDateFieldFormat === 'family-member') {
            serializedObject.minDate = new Date().setFullYear(new Date().getFullYear() - 150)
            serializedObject.maxDate = new Date()
        } else if (birthDateFieldFormat === 'owner') {
            serializedObject.minDate = new Date().setFullYear(new Date().getFullYear() - 150)
            serializedObject.maxDate = new Date().setFullYear(new Date().getFullYear() - 18)
            serializedObject.currentDate = isFieldValueAvailable
                ? toDateObject(new Date(moment(fieldValue, 'jYYYY/jM/jD').format('YYYY/M/D')))
                : toDateObject(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
        }

        return serializedObject
    }
}

const serializeBirthDateInputField = ({
    birthDateFieldFormat,
}: {
    birthDateFieldFormat?: 'owner' | 'family-member'
}) => {
    if (birthDateFieldFormat) {
        const serializedObject: {
            minDate?: string | number
            maxDate?: string | number
        } = {}

        if (birthDateFieldFormat === 'family-member') {
            serializedObject.minDate = new Date().setFullYear(new Date().getFullYear() - 150)
            serializedObject.maxDate = new Date().getTime()
        } else if (birthDateFieldFormat === 'owner') {
            serializedObject.minDate = new Date().setFullYear(new Date().getFullYear() - 150)
            serializedObject.maxDate = new Date().setFullYear(new Date().getFullYear() - 18)
        }

        return serializedObject
    }
}

export { serializeCalendar, serializeBirthDateFieldCalendar, serializeBirthDateInputField }
