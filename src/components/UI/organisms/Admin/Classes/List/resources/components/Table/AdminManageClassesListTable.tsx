import { Menu } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { type TCriticalAny } from '@core/types/critical-any'
import { type AdminClassesListTable } from '@core/types/table/adminClasses'

import { STATIC_TABLE_DATA } from './resources'

const Table = () => {
    const columnHelper = createColumnHelper<AdminClassesListTable>()

    const deleteClassById = (classTitle: string) => {
        modals.openConfirmModal({
            title: `حذف کلاس ${classTitle}`,
            children: <p className='text-gray-600 text-sm font-light'>پس از حذف کلاس، امکان بازگشت وجود ندارد.</p>,
            labels: { confirm: 'حذف', cancel: 'بازگشت' },
            confirmProps: { color: 'red' },
        })
    }

    const columns: TCriticalAny[] = [
        // Add the index column
        // Add the index column
        columnHelper.accessor('index', {
            header: 'ردیف',
            cell: ({ cell }) => cell.row.index + 1,
        }),
        columnHelper.accessor('title', {
            header: 'نام درس',
        }),
        columnHelper.accessor('start_time', {
            header: 'ساعت شروع کلاس',
        }),
        columnHelper.accessor('end_time', {
            header: 'ساعت پایان کلاس',
        }),
        columnHelper.accessor('day', {
            header: 'روز برگزاری کلاس',
        }),
        columnHelper.accessor('test_date', {
            header: 'تاریخ آزمون',
        }),
        columnHelper.accessor('test_time', {
            header: 'ساعت برگزاری آزمون',
        }),
        columnHelper.accessor('operators', {
            header: 'عملیات',
            cell({ cell }) {
                return (
                    <Menu width={200}>
                        <Menu.Target>
                            <DActionIcon color='dark' variant='subtle'>
                                <IconDotsVertical />
                            </DActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                onClick={() => deleteClassById(cell.row.original.title)}
                                color='#e31102'
                                leftSection={<IconTrash size={19} />}
                            >
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

    return <DTable data={table} minWidth={950} />
}

export default Table
