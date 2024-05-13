import { type FC } from 'react'
import { toast } from 'react-toastify'
import { Menu } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { deleteClassByIdFn } from '@api/delete-class-by-id'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IAuthMutationFnProps } from '@core/types/data/auth'
import { type TClassesListFnType } from '@core/types/data/classes-list'

import { type IAdminManageClassesListTableProps } from './resources'

interface ITabelDataType extends TClassesListFnType {
    operators: unknown
    index: number
}

const Table: FC<IAdminManageClassesListTableProps> = ({ data }) => {
    const columnHelper = createColumnHelper<ITabelDataType>()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (classId: number) => deleteClassByIdFn(classId),
        onSuccess: (res: IAuthMutationFnProps) => {
            toast.info(res?.message)
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.ClassesList],
            })
        },
        onError: (err: TCriticalAny) => {
            toast.error(err.message)
        },
    })

    const deleteClassById = (classTitle: string, classId: number) => {
        modals.openConfirmModal({
            title: `حذف کلاس ${classTitle}`,
            children: <p className='text-gray-600 text-sm font-light'>پس از حذف کلاس، امکان بازگشت وجود ندارد.</p>,
            labels: { confirm: 'حذف', cancel: 'بازگشت' },
            confirmProps: { color: 'red' },
            onConfirm() {
                mutate(classId)
            },
        })
    }

    const columns: TCriticalAny[] = [
        columnHelper.accessor('index', {
            header: 'ردیف',
            cell: ({ cell }) => cell.row.index + 1,
        }),
        columnHelper.accessor('title', {
            header: 'درس',
        }),
        columnHelper.accessor('start_time', {
            header: 'ساعت شروع',
        }),
        columnHelper.accessor('end_time', {
            header: 'ساعت پایان',
        }),
        columnHelper.accessor('day', {
            header: 'روز برگزاری',
        }),
        columnHelper.accessor('test_date', {
            header: 'تاریخ آزمون',
            cell({ row }) {
                return row.original.test_date || 'نامشخص'
            },
        }),
        columnHelper.accessor('test_time', {
            header: 'ساعت برگزاری آزمون',
            cell({ row }) {
                return row.original.test_time || 'نامشخص'
            },
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
                                onClick={() => deleteClassById(cell.row.original.title, cell.row.original.id)}
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
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return <DTable data={table} minWidth={950} />
}

export default Table
