import { type FC, type PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'

import { DNavigationTab } from '@molecules/DNavigationTab'

import { DActionIcon } from '@atoms/DActionIcon'

import { removeCookieStorageItem } from '@core/services/storage'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
    const { push } = useRouter()

    const logoutHandler = () => {
        removeCookieStorageItem('Secure-KY')
        push('/auth')
    }

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
                                        <p className='font-semibold text-xl'>محمد احمدی</p>
                                    </div>
                                    <p className='text-xs'>مدیریت اساتید، دروس و کلاس</p>
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

                    <DNavigationTab
                        navigationItems={[
                            { title: 'اساتید', href: '/admin/teachers' },
                            { title: 'دروس', href: '/admin/lessons' },
                            { title: 'کلاس', href: '/admin/classes' },
                            { title: 'مدیریت فایل‌ها', href: '/admin/files' },
                        ]}
                    />
                </div>
                <div className='p-6'>{children}</div>
            </section>
        </>
    )
}

export default AdminLayout
