import { Menu } from '@mantine/core'

import { AdminCreateTeacher } from '@organisms/Admin/Teachers/Create'
import AdminManageTeachersList from '@organisms/Admin/Teachers/List/AdminManageTeachers'

import { DButton } from '@atoms/DButton'

const AdminManageTeachers = () => {
    return (
        <section className='flex flex-col gap-6'>
            {/* add teacher form */}
            <div>
                <p>ثبت استاد</p>
                <AdminCreateTeacher />
            </div>

            {/* teachers list */}
            <div className='w-full flex flex-col gap-6'>
                <div className='w-full flex items-center justify-between'>
                    <p>لیست اساتید</p>
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

                <AdminManageTeachersList />
            </div>
        </section>
    )
}

export default AdminManageTeachers
