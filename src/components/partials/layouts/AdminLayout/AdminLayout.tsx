import { type FC, type PropsWithChildren } from 'react'
import { Avatar } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'

import { DNavigationTab } from '@molecules/DNavigationTab'

import { DButton } from '@atoms/DButton'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
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

                        <DButton
                            className='mt-4'
                            leftSection={<IconUser className='shrink-0' />}
                            color='#e31102'
                            variant='outline'
                        >
                            خروج از حساب کاربری
                        </DButton>
                    </div>

                    <hr />

                    <DNavigationTab
                        navigationItems={[
                            { title: 'اساتید', href: '/admin/teachers' },
                            { title: 'دروس', href: '/admin/lessons' },
                            { title: 'کلاس', href: '/admin/classes' },
                            { title: 'پروفایل کاربری', href: '/admin' },
                        ]}
                    />
                </div>
                <div className='p-6'>{children}</div>
            </section>
        </>
    )
}

export default AdminLayout
