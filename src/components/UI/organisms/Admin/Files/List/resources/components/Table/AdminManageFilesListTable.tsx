import { type FC } from 'react'
import Link from 'next/link'
import { Badge, Menu } from '@mantine/core'
import { IconCheck, IconDotsVertical, IconEye } from '@tabler/icons-react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { type TCriticalAny } from '@core/types/critical-any'
import { type TAdminTeacherFilesListTableType } from '@core/types/table/adminTeacherFIles'

import { type IAdminManageFilesListTableProps } from './resources'

const Table: FC<IAdminManageFilesListTableProps> = ({ data }) => {
    const columnHelper = createColumnHelper<TAdminTeacherFilesListTableType>()

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
        columnHelper.accessor('user_type', {
            header: 'نوع کاربر',
            cell({ row }) {
                return row.original.user_type === 1 ? 'رئیس دانشگاه' : 'استاد'
            },
        }),
        columnHelper.accessor('date', {
            header: 'تاریخ ایجاد',
        }),
        columnHelper.accessor('is_show', {
            header: 'وضعیت نمایش',
            cell({ row }) {
                const isShow: boolean = row.original.is_show === 1
                return <Badge color={isShow ? 'green' : 'red'}>{isShow ? 'نمایش' : 'عدم نمایش'}</Badge>
            },
        }),
        columnHelper.accessor('operators', {
            header: 'عملیات',
            cell({ row }) {
                return (
                    <Menu width={200}>
                        <Menu.Target>
                            <DActionIcon color='dark' variant='subtle'>
                                <IconDotsVertical />
                            </DActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                component={Link}
                                href={row.original.file_path}
                                target='_blank'
                                leftSection={<IconEye size={19} />}
                            >
                                نمایش فایل
                            </Menu.Item>
                            {row.original.is_show === 0 && (
                                <Menu.Item color='#e31102' leftSection={<IconCheck size={19} />}>
                                    تایید
                                </Menu.Item>
                            )}
                        </Menu.Dropdown>
                    </Menu>
                )
            },
        }),
    ]

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return <DTable data={table} minWidth={750} />
}

export default Table
