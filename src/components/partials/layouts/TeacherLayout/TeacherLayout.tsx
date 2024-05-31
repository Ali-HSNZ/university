import { type FC, type PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

import { DNavigationTab } from '@molecules/DNavigationTab'

import { DActionIcon } from '@atoms/DActionIcon'

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

                        <div>
                            <DActionIcon
                                size={'auto'}
                                className='p-2'
                                color='#e31102'
                                variant='subtle'
                                onClick={logoutHandler}
                            >
                                <IconLogout className='shrink-0' />
                                <p className='font-medium mr-1.5 hidden sm:inline text-sm'>خروج از حساب کاربری</p>
                            </DActionIcon>
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
