import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { DButton } from '@atoms/DButton'
import { DPinInput } from '@atoms/DPinInput'

import { type IOtpFormProps, type TOtpFormFormType } from './resources'

const OtpForm = ({ otp, setOtp }: IOtpFormProps) => {
    const { push } = useRouter()

    const [dataSchema, setDataSchema] = useState<TOtpFormFormType>({
        otp: '',
    })

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (dataSchema.otp === otp) {
            push('/baz-sazi')
        } else {
            toast.error('اطلاعات وارد شده صحیح نمی‌باشد')
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='size-full'>
            <div className='h-full flex flex-col items-center lg:items-start justify-between'>
                <div className='w-full flex flex-col gap-1 max-w-md '>
                    <span className='text-sm font-semibold select-none '>
                        لطفا کد پیامک شده به شماره 09226544893 را وارد کنید
                    </span>

                    <DPinInput
                        autoFocus
                        type={'number'}
                        length={5}
                        placeholder=''
                        value={dataSchema.otp}
                        onChange={(value) => setDataSchema({ otp: value })}
                    />
                    <span
                        className='text-xs text-blue-700 hover:underline mt-2 cursor-pointer font-semibold select-none'
                        onClick={() => setOtp(null)}
                    >
                        کد ملی را اشتباه وارد کرده‌ام
                    </span>
                </div>
                <DButton fullWidth disabled={dataSchema.otp.length !== 5} type='submit'>
                    تایید کد
                </DButton>
            </div>
        </form>
    )
}

export default OtpForm
