import { Menu } from '@mantine/core'
import { IconDotsVertical, IconTrash, IconUser } from '@tabler/icons-react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { type TCriticalAny } from '@core/types/critical-any'

import { STATIC_TABLE_DATA } from './resources'

const Table = () => {
    const columnHelper = createColumnHelper()

    const columns: TCriticalAny[] = [
        // Add the index column
        columnHelper.accessor('index', {
            header: 'ردیف',
            cell: ({ cell }) => cell.row.index + 1,
        }),
        columnHelper.accessor('first_name', {
            header: 'نام',
        }),
        columnHelper.accessor('last_name', {
            header: 'نام خانوادگی',
        }),
        columnHelper.accessor('gender', {
            header: 'جنسیت',
        }),
        columnHelper.accessor('age', {
            header: 'سن',
        }),
        columnHelper.accessor('code', {
            header: 'کد استاد',
        }),
        columnHelper.accessor('operators', {
            header: 'عملیات',
            cell() {
                return (
                    <Menu width={200}>
                        <Menu.Target>
                            <DActionIcon color='dark' variant='subtle'>
                                <IconDotsVertical />
                            </DActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconUser size={19} />}>ویرایش پروفایل</Menu.Item>
                            <hr />
                            <Menu.Item color='#e31102' leftSection={<IconTrash size={19} />}>
                                حذف
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                )
            },
        }),
    ]

    const table = useReactTable({
        data: STATIC_TABLE_DATA,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return <DTable data={table} minWidth={750} />
}

export default Table
