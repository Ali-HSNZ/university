import { useRouter } from 'next/navigation'
import { Badge, Menu, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconChevronLeft, IconDotsVertical, IconPlus, IconTrash, IconUser } from '@tabler/icons-react'
import { IconListCheck } from '@tabler/icons-react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { Routes } from '@core/routes'
import { type TCriticalAny } from '@core/types/critical-any'
import { type AdminTeachersListTable } from '@core/types/table/adminTeachersList'

import { ClassAssignment, STATIC_TABLE_DATA } from './resources'

const Table = () => {
    const { push } = useRouter()

    const [opened, { open, close }] = useDisclosure(false)

    const columnHelper = createColumnHelper<AdminTeachersListTable>()

    const deleteTeacherById = ({ first_name, last_name }: { first_name: string; last_name: string }) => {
        modals.openConfirmModal({
            title: `حذف  ${first_name} ${last_name}`,
            children: <p className='text-gray-600 text-sm font-light'>پس از حذف استاد، امکان بازگشت وجود ندارد.</p>,
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
        columnHelper.accessor('first_name', {
            header: 'نام',
        }),
        columnHelper.accessor('last_name', {
            header: 'نام خانوادگی',
        }),
        columnHelper.accessor('age', {
            header: 'سن',
        }),
        columnHelper.accessor('status', {
            header: 'وضعیت',
            cell({ cell }) {
                const isActive = cell.row.original.status
                return <Badge color={isActive ? 'green' : 'red'}> {isActive ? 'در حال فعالیت' : 'عدم فعالیت'}</Badge>
            },
        }),
        columnHelper.accessor('class_count', {
            header: 'تعداد کلاس',
        }),
        columnHelper.accessor('code', {
            header: 'کد استاد',
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
                                onClick={() => push(Routes.AdminTeacherProfile(cell.row.original.code))}
                                leftSection={<IconUser size={19} />}
                                rightSection={<IconChevronLeft size={19} />}
                            >
                                ویرایش پروفایل
                            </Menu.Item>

                            <Menu.Item onClick={open} leftSection={<IconPlus size={19} />}>
                                تخصیص کلاس
                            </Menu.Item>

                            <Menu.Item
                                rightSection={<IconChevronLeft size={19} />}
                                leftSection={<IconListCheck size={19} />}
                            >
                                لیست کلاس‌ها
                            </Menu.Item>

                            <hr />
                            <Menu.Item
                                onClick={() =>
                                    deleteTeacherById({
                                        first_name: cell.row.original.first_name,
                                        last_name: cell.row.original.last_name,
                                    })
                                }
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

    return (
        <>
            <Modal opened={opened} title='تخصیص کلاس به استاد رضا اکبری' onClose={close}>
                <ClassAssignment close={close} />
            </Modal>
            <DTable data={table} minWidth={750} />
        </>
    )
}

export default Table
