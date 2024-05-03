import { useState } from 'react'
import { toast } from 'react-toastify'
import { TextInput } from '@mantine/core'

import { DButton } from '@atoms/DButton'

import { validateNationalCode } from '@core/utils/validations/form/NationalCode.validation'

import { type IRootAuthFormProps, type TRootAuthFormType } from './resources'

const RootAuthForm = ({ setOtp }: IRootAuthFormProps) => {
    const [dataSchema, setDataSchema] = useState<TRootAuthFormType>({
        code: '',
    })

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //check validation of code
        if (!validateNationalCode(dataSchema.code)) return toast.error('لطفا کد‌ملی را به درستی وارد کنید')

        const randomNumber = Math.floor(10000 + Math.random() * 90000).toString()

        toast.info(`کد ورود: ${randomNumber}`, {
            autoClose: false,
        })

        //go to otpCode
        setOtp(randomNumber)
    }

    return (
        <form onSubmit={onSubmitHandler} className='size-full'>
            <div className='h-full flex items-center lg:items-start flex-col justify-between'>
                <TextInput
                    withAsterisk
                    size='md'
                    type='text'
                    label='کد ملی'
                    maxLength={10}
                    name='nationalCode'
                    description='متقاضی گرامی جهت احراز هویت، لطفا کد ملی خود را وارد کنید'
                    className='w-full max-w-md lg:max-w-none'
                    classNames={{ label: 'select-none' }}
                    value={dataSchema.code}
                    onChange={(e) => setDataSchema({ code: e.target.value })}
                />

                <DButton fullWidth disabled={!validateNationalCode(dataSchema.code)} type='submit'>
                    ورود
                </DButton>
            </div>
        </form>
    )
}

export default RootAuthForm
