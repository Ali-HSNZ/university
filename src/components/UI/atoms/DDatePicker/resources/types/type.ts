import { type Plugin } from 'react-multi-date-picker'

interface IDatePickerProps {
    ContainerClass?: string
    disableDayPicker?: boolean
    format?: string
    plugins?: (Plugin | Plugin[])[] | undefined
    withAsterisk?: boolean
    label?: string
    placeholder?: string
}

export default IDatePickerProps
