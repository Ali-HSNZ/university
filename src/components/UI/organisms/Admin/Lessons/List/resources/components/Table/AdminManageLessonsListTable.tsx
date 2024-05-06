import { Menu } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { type TCriticalAny } from '@core/types/critical-any'
import { type AdminLessonsListTable } from '@core/types/table/adminLessons'

import { STATIC_TABLE_DATA } from './resources'

const Table = () => {
    const columnHelper = createColumnHelper<AdminLessonsListTable>()

    const deleteLessonById = (lesson: string) => {
        modals.openConfirmModal({
            title: `حذف درس ${lesson}`,
            children: <p className='text-gray-600 text-sm font-light'>پس از حذف درس، امکان بازگشت وجود ندارد.</p>,
            labels: { confirm: 'حذف', cancel: 'بازگشت' },
            confirmProps: { color: 'red' },
        })
    }

    const columns: TCriticalAny[] = [
        // Add the index column
        columnHelper.accessor('index', {
            header: 'ردیف',
            cell: ({ cell }) => cell.row.index + 1,
        }),
        columnHelper.accessor('title', {
            header: 'عنوان',
        }),
        columnHelper.accessor('code', {
            header: 'کد استاندارد',
        }),
        columnHelper.accessor('lesson_type', {
            header: 'نوع درس',
        }),
        columnHelper.accessor('theory_unit', {
            header: 'واحد تئوری',
        }),
        columnHelper.accessor('practical_unit', {
            header: 'واحد عملی',
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
                            <hr />
                            <Menu.Item
                                onClick={() => deleteLessonById(cell.row.original.title)}
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

    return <DTable data={table} minWidth={750} />
}

export default Table
