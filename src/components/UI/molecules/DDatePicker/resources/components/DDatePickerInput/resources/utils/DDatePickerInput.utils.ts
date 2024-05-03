import { type Dispatch, type RefObject, type SetStateAction } from 'react'
import { toast } from 'react-toastify'

const handleMouseDown = (inputRef: RefObject<HTMLInputElement>) => {
    const inputValue =
        inputRef?.current?.value.replaceAll('_', '').replaceAll(' ', '').replaceAll('-', '').replaceAll('/', '') || ''
    const length = inputValue.length

    setTimeout(() => {
        if (length < 4) inputRef?.current?.setSelectionRange(length, length)
        else if (length >= 4 && length < 6) inputRef?.current?.setSelectionRange(length + 1, length + 1)
        else if (length >= 6) inputRef?.current?.setSelectionRange(length + 2, length + 2)
    }, 0)
}

const serializeInputValue = (
    value: string,
    inputRef: RefObject<HTMLInputElement>,
    setInputValue: Dispatch<SetStateAction<string>>
) => {
    // YYYY/Mm/Dd
    const ValidMValues = ['0', '1']
    const MValue = value.substring(5, 6)
    const MmValue = value.substring(5, 7)
    const ValidDValues = ['0', '1', '2', '3']
    const DValue = value.substring(8, 9)
    const DdValue = value.substring(8, 10)

    if (MValue !== '_' && !ValidMValues.includes(MValue)) {
        toast.warning('ماه وارد شده نامعتبر است', { toastId: 'Wrong MValue' })
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.setSelectionRange(5, 5)
            }
        }, 0)
    } else if ((+MmValue || +MmValue === 0) && !/^(0[1-9]|1[0-2])$/.test(MmValue)) {
        toast.warning('ماه وارد شده نامعتبر است', { toastId: 'Wrong MmValue' })
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.setSelectionRange(6, 6)
            }
        }, 0)
    } else if (DValue !== '_' && !ValidDValues.includes(DValue)) {
        toast.warning('روز وارد شده نامعتبر است', { toastId: 'Wrong DValue' })
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.setSelectionRange(8, 8)
            }
        }, 0)
    } else if ((+DdValue || +DdValue === 0) && !/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/.test(DdValue)) {
        toast.warning('روز وارد شده نامعتبر است', { toastId: 'Wrong DdValue' })
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.setSelectionRange(9, 9)
            }
        }, 0)
    } else {
        setInputValue(value)
    }
}

export { handleMouseDown, serializeInputValue }
