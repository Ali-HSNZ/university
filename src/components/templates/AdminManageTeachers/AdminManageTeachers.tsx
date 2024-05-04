import { Menu } from '@mantine/core'

import AdminManageTeachersList from '@organisms/Admin/Teachers/List/AdminManageTeachers'

import { DButton } from '@atoms/DButton'

const AdminManageTeachers = () => {
    return (
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
    )
}

export default AdminManageTeachers
