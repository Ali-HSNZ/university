import { useRouter } from 'next/navigation'
import { IconChevronRight } from '@tabler/icons-react'

import { DButton } from '@atoms/DButton'

const NotAccessTemplate = () => {
    const router = useRouter()

    return (
        <div className='w-full h-screen flex justify-center items-center font-medium'>
            <div className='bg-white shadow-lg p-6 justify-between size-[350px] flex flex-col gap-4 border-2 rounded-xl'>
                <p className='  text-center'>عدم دسترسی</p>
                <div className='text-center'>
                    <p className='text-7xl text-red-600'>403</p>
                    <p className=''>دسترسی به این صفحه امکان پذیر نیست</p>
                </div>
                <DButton leftSection={<IconChevronRight />} onClick={() => router.back()}>
                    بازگشت به صفحه قبل
                </DButton>
            </div>
        </div>
    )
}

export default NotAccessTemplate
