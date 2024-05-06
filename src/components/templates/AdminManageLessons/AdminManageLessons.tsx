import { Menu } from '@mantine/core'

import { AdminCreateLesson } from '@organisms/Admin/Lessons/Create'
import { AdminLessonsList } from '@organisms/Admin/Lessons/List'

import { DButton } from '@atoms/DButton'

const AdminManageLessons = () => {
    return (
        <section className='flex flex-col gap-6'>
            {/* Add lesson */}
            <div>
                <p>ثبت درس</p>
                <AdminCreateLesson />
            </div>

            {/* Lessons list */}
            <div className='w-full flex flex-col gap-6'>
                <div className='w-full flex items-center justify-between'>
                    <p>لیست دروس</p>
                    <Menu>
                        <Menu.Target>
                            <DButton variant='light'>خروجی جدول</DButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>خروجی فایل PDF</Menu.Item>
                            <Menu.Item>خروجی فایل Excel</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>

                <AdminLessonsList />
            </div>
        </section>
    )
}

export default AdminManageLessons
