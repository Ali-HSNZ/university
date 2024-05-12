import { type FC } from 'react'
import { toast } from 'react-toastify'
import { Menu } from '@mantine/core'
import { modals } from '@mantine/modals'
import { IconDotsVertical, IconTrash } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { deleteLessonByCodeFn } from '@api/delete-lesson-by-code'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IAuthMutationFnProps } from '@core/types/data/auth'
import { type TAdminLessonsListTableType } from '@core/types/table/adminLessons'

import { type IAdminManageLessonsListTableProps } from './resources'

const Table: FC<IAdminManageLessonsListTableProps> = ({ data }) => {
    const columnHelper = createColumnHelper<TAdminLessonsListTableType>()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (lessonCode: string) => deleteLessonByCodeFn(lessonCode),
        onSuccess: (res: IAuthMutationFnProps) => {
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
            children: <p className='text-gray-600 text-sm font-light'>پس از حذف درس، امکان بازگشت وجود ندارد.</p>,
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
                    <Menu width={200}>
                        <Menu.Target>
                            <DActionIcon color='dark' variant='subtle'>
                                <IconDotsVertical />
                            </DActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                onClick={() => deleteLessonById(cell.row.original.code, cell.row.original.title)}
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

    return <DTable data={table} minWidth={750} />
}

export default Table
