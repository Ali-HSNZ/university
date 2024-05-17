import { type FC, type PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

import { DNavigationTab } from '@molecules/DNavigationTab'

import { DButton } from '@atoms/DButton'

import { getTeacherProfileFn } from '@api/get-teacher-profile'

import { QueryKeys } from '@core/enums/query-keys'
import { removeCookieStorageItem } from '@core/services/storage'
import { type TTeacherProfileFnType } from '@core/types/data/teacher-profile'

const TeacherLayout: FC<PropsWithChildren> = ({ children }) => {
    const { push } = useRouter()

    const logoutHandler = () => {
        removeCookieStorageItem('Secure-KY')
        push('/auth')
    }

    const { data } = useQuery<TTeacherProfileFnType>({
        queryKey: [QueryKeys.TeacherProfile],
        queryFn: () => getTeacherProfileFn(),
    })

    return (
        <>
            <section>
                <div className='bg-white px-6'>
                    <div className='flex  py-6 justify-between'>
                        <div className='flex gap-6 '>
                            {/* teacher image */}
                            <Avatar size={'xl'} />

                            <div>
                                <div>
                                    <div className='flex gap-1'>
                                        <p className='font-semibold text-xl'>
                                            {data?.first_name} {data?.last_name}
                                        </p>
                                        <p className='text-xs'>({data?.national_code})</p>
                                    </div>
                                    <p className='text-xs'>مدیریت کلاس و خروجی Excel , PDF</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-between'>
                            <DButton
                                onClick={logoutHandler}
                                leftSection={<IconUser className='shrink-0' />}
                                color='#e31102'
                                variant='outline'
                            >
                                خروج از حساب کاربری
                            </DButton>
                        </div>
                    </div>

                    <hr />

                    <DNavigationTab navigationItems={[{ title: 'لیست کلاس‌ها', href: '/teacher' }]} />
                </div>
                <div className='p-6'>{children}</div>
            </section>
        </>
    )
}

export default TeacherLayout
