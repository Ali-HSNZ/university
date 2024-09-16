import { type FC } from 'react'
import { toast } from 'react-toastify'
import { modals } from '@mantine/modals'
import { IconTrash } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { deleteTeacherClassByIdFn } from '@api/delete-teacher-class-by-id'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IBaseMutationFnProps } from '@core/types/data/base-response'
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
        onSuccess: (res: IBaseMutationFnProps) => {
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
                    <DActionIcon
                        onClick={() => deleteTeacherLesson(cell.row.original.id, cell.row.original.title)}
                        color='red'
                        variant='subtle'
                    >
                        <IconTrash size={19} />
                    </DActionIcon>
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
