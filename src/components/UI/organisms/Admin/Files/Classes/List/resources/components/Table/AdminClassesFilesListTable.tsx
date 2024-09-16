import { type FC } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { ActionIcon } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconDownload, IconTrash, IconUser } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { deleteClassFileFn } from '@api/delete-class-file'

import { QueryKeys } from '@core/enums/query-keys'
import { Routes } from '@core/routes'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IBaseMutationFnProps } from '@core/types/data/base-response'
import { type TAdminTeacherFilesListTableType } from '@core/types/table/adminTeacherFIles'

import { type IAdminClassesFilesListTableProps } from './resources'

const Table: FC<IAdminClassesFilesListTableProps> = ({ data }) => {
    const columnHelper = createColumnHelper<TAdminTeacherFilesListTableType>()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: ({ fileName, fileId }: { fileName: string; fileId: number }) =>
            deleteClassFileFn({ fileName, fileId }),
        onSuccess: (res: IBaseMutationFnProps) => {
            toast.info(res?.message)
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.AdminClassesFiles],
            })
        },
        onError: (err: TCriticalAny) => {
            toast.error(err.message)
        },
    })

    const deleteFile = (filePath: string, fileId: number) => {
        modals.openConfirmModal({
            title: `حذف فایل`,
            children: <p className='text-gray-600 text-sm font-light'>پس از حذف فایل، امکان بازگشت وجود ندارد.</p>,
            labels: { confirm: 'حذف', cancel: 'بازگشت' },
            confirmProps: { color: 'red' },
            onConfirm() {
                const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))

                mutate({ fileName, fileId })
            },
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
        columnHelper.accessor('date', {
            header: 'تاریخ ایجاد',
        }),
        columnHelper.accessor('operators', {
            header: 'عملیات',
            cell({ row }) {
                return (
                    <section className='flex gap-2'>
                        <ActionIcon
                            component={Link}
                            href={row.original.file_path}
                            target='_blank'
                            variant='subtle'
                            color='dark'
                        >
                            <IconDownload size={19} />
                        </ActionIcon>
                        <ActionIcon
                            component={Link}
                            href={Routes.AdminTeacherProfile(row.original.user_code)}
                            variant='subtle'
                            color='dark'
                        >
                            <IconUser size={19} />
                        </ActionIcon>

                        <ActionIcon
                            onClick={() => deleteFile(row.original.file_path, row.original.fileId)}
                            color='red'
                            variant='subtle'
                        >
                            <IconTrash size={19} />
                        </ActionIcon>
                    </section>
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
