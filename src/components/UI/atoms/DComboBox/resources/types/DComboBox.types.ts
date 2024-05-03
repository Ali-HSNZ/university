interface IDComboBoxProps {
    data: {
        value: string
        label: string
    }[]
    isSuccess?: boolean
    isLoading?: boolean
    isError?: boolean
    placeholder?: string
    defaultWidth?: boolean
    fieldValue: string[]
    onFieldChange: (values: string[]) => void
}

export default IDComboBoxProps
