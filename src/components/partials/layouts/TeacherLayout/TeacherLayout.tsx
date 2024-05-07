import { type FC, type PropsWithChildren } from 'react'
import { Avatar } from '@mantine/core'
import { IconUser } from '@tabler/icons-react'

import { DNavigationTab } from '@molecules/DNavigationTab'

import { DButton } from '@atoms/DButton'

const TeacherLayout: FC<PropsWithChildren> = ({ children }) => {
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
                                        <p className='font-semibold text-xl'>علی حسن زاده</p>
                                        <p className='text-xs'>(48684654684)</p>
                                    </div>
                                    <p className='text-xs'>مدیریت کلاس و خروجی Excel , PDF</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col justify-between'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-1 text-xs'>
                                    <p className='font-semibold'>کلاس:</p>
                                    <p>20</p>
                                </div>
                                <div className='flex gap-1 text-xs'>
                                    <p className='font-semibold'>آخرین مدرک تحصیلی:</p>
                                    <p>فوق لیسانس کامپیوتر</p>
                                </div>
                            </div>

                            <DButton leftSection={<IconUser className='shrink-0' />} color='#e31102' variant='outline'>
                                خروج از حساب کاربری
                            </DButton>
                        </div>
                    </div>

                    <hr />

                    <DNavigationTab
                        navigationItems={[
                            { title: 'لیست کلاس‌ها', href: '/teacher' },
                            { title: 'پروفایل کاربری', href: '/teacher/me' },
                        ]}
                    />
                </div>
                <div className='p-6'>{children}</div>
            </section>
        </>
    )
}

export default TeacherLayout
