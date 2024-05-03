'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { DButton } from '@atoms/DButton'

import IMGError from '@public/images/error.svg'

const ErrorPage = (err: unknown) => {
    const { refresh } = useRouter()
    console.error(err)

    return (
        <div className='w-full min-h-screen flex items-center justify-center text-center flex-col select-none'>
            <Image src={IMGError} alt='error' className='w-full max-w-24 mb-4' />
            <h1 className='font-semibold text-lg text-gray-500'>متاسفانه مشکلی در برقراری ارتباط پیش آمده است</h1>
            <p className='text-sm text-gray-500 font-semibold mb-4'>لطفا کمی بعد مجددا تلاش کنید</p>
            <DButton variant='filled' onClick={refresh}>
                تلاش مجدد
            </DButton>
        </div>
    )
}

export default ErrorPage
