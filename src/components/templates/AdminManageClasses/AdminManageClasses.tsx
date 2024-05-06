import { Menu } from '@mantine/core'

import { AdminCreateClass } from '@organisms/Admin/Classes/Create'
import { AdminClassesList } from '@organisms/Admin/Classes/List'

import { DButton } from '@atoms/DButton'

const AdminManageClasses = () => {
    return (
        <section className='flex flex-col gap-6'>
            {/* Add class */}
            <div>
                <p>ثبت کلاس</p>
                <AdminCreateClass />
            </div>

            {/* Class list */}
            <div className='w-full flex flex-col gap-6'>
                <div className='w-full flex items-center justify-between'>
                    <p>لیست کلاس ها</p>
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

                <AdminClassesList />
            </div>
        </section>
    )
}

export default AdminManageClasses
