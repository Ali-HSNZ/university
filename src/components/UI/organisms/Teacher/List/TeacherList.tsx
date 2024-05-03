'use client'
import { Menu } from '@mantine/core'

import { DButton } from '@atoms/DButton'

import { TeacherListTable } from './resources'

const TeacherList = () => {
    return (
        <div className='w-full flex flex-col gap-6'>
            <div className='w-full flex  justify-end'>
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

            <TeacherListTable />
        </div>
    )
}

export default TeacherList
