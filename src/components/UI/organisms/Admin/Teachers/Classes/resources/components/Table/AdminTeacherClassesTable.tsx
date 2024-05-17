import { type FC } from 'react'
import { toast } from 'react-toastify'
import { Menu } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { deleteTeacherClassByIdFn } from '@api/delete-teacher-class-by-id'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IAuthMutationFnProps } from '@core/types/data/auth'
import { type TTeacherSingleClassType } from '@core/types/data/teacher-classes-list'

import { type IAdminTeacherClassesTableProps } from './resources'

interface ITabelDataType extends TTeacherSingleClassType {
    operators: unknown
    index: number
}

const Table: FC<IAdminTeacherClassesTableProps> = ({ data, teacher_code }) => {
    const columnHelper = createColumnHelper<ITabelDataType>()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (classId: number) => deleteTeacherClassByIdFn(teacher_code, classId),
        onSuccess: (res: IAuthMutationFnProps) => {
            toast.info(res?.message)
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.AdminTeacherClassesList],
            })
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.TeachersList],
            })
        },
        onError: (err: TCriticalAny) => {
            console.log(err)
            toast.error(err.message)
        },
    })

    const deleteTeacherLesson = (id: number, title: string) => {
        modals.openConfirmModal({
            title: `حذف کلاس ${title}`,
            children: <p className='text-gray-600 text-sm font-light'>پس از حذف کلاس، امکان بازگشت وجود ندارد.</p>,
            labels: { confirm: 'حذف', cancel: 'بازگشت' },
            confirmProps: { color: 'red' },
            onConfirm() {
                mutate(id)
            },
        })
    }

    const columns: TCriticalAny[] = [
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
            cell: ({ row }) => row.original.test_date || 'نامشخص',
        }),
        columnHelper.accessor('test_time', {
            header: 'ساعت برگزاری آزمون',
            cell: ({ row }) => row.original.test_time || 'نامشخص',
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
                                onClick={() => deleteTeacherLesson(cell.row.original.id, cell.row.original.title)}
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
