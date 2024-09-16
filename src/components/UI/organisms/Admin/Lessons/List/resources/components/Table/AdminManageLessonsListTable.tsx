import { type FC } from 'react'
import { toast } from 'react-toastify'
import { ActionIcon } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconTrash } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { deleteLessonByCodeFn } from '@api/delete-lesson-by-code'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IBaseMutationFnProps } from '@core/types/data/base-response'
import { type TAdminLessonsListTableType } from '@core/types/table/adminLessons'

import { type IAdminManageLessonsListTableProps } from './resources'

const Table: FC<IAdminManageLessonsListTableProps> = ({ data }) => {
    const columnHelper = createColumnHelper<TAdminLessonsListTableType>()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (lessonCode: string) => deleteLessonByCodeFn(lessonCode),
        onSuccess: (res: IBaseMutationFnProps) => {
            toast.info(res?.message)
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.LessonsList],
            })
        },
        onError: (err: TCriticalAny) => {
            toast.error(err.message)
        },
    })

    const deleteLessonById = (code: string, title: string) => {
        modals.openConfirmModal({
            title: `حذف درس ${title}`,
            children: (
                <p className='text-gray-600 text-sm font-light'>پس از حذف درس، تمامی کلاس های مرتبط حذف خواهند شد.</p>
            ),
            labels: { confirm: 'حذف', cancel: 'بازگشت' },
            confirmProps: { color: 'red' },
            onConfirm() {
                mutate(code)
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
            header: 'عنوان',
        }),
        columnHelper.accessor('code', {
            header: 'کد استاندارد',
        }),
        columnHelper.accessor('type', {
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
                    <ActionIcon
                        onClick={() => deleteLessonById(cell.row.original.code, cell.row.original.title)}
                        color='red'
                        variant='subtle'
                    >
                        <IconTrash size={19} />
                    </ActionIcon>
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
