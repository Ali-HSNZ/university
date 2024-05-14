import { type FC, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { Menu, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconChevronLeft, IconDotsVertical, IconPlus, IconTrash, IconUser } from '@tabler/icons-react'
import { IconListCheck } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { DActionIcon } from '@atoms/DActionIcon'

import { deleteTeacherByCodeFn } from '@api/delete-teacher-by-code'

import { QueryKeys } from '@core/enums/query-keys'
import { Routes } from '@core/routes'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IAuthMutationFnProps } from '@core/types/data/auth'
import { type TTeachersListFnType } from '@core/types/data/teachers-list'

import { ClassAssignment, type IAdminManageTeacherListTableProps } from './resources'

interface ITabelDataType extends TTeachersListFnType {
    operators: unknown
    index: number
}

const Table: FC<IAdminManageTeacherListTableProps> = ({ data }) => {
    const [opened, { open, close }] = useDisclosure(false)

    const [rowDetail, setRowDetail] = useState<TTeachersListFnType>()

    const columnHelper = createColumnHelper<ITabelDataType>()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: (teacherCode: string) => deleteTeacherByCodeFn(teacherCode),
        onSuccess: (res: IAuthMutationFnProps) => {
            toast.info(res?.message)
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.TeachersList],
            })
        },
        onError: (err: TCriticalAny) => {
            toast.error(err.message)
        },
    })

    const deleteTeacherById = ({
        first_name,
        last_name,
        code,
    }: {
        first_name: string
        last_name: string
        code: string
    }) => {
        modals.openConfirmModal({
            title: `حذف  ${first_name} ${last_name}`,
            children: <p className='text-gray-600 text-sm font-light'>پس از حذف استاد، امکان بازگشت وجود ندارد.</p>,
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
        columnHelper.accessor('first_name', {
            header: 'نام',
        }),
        columnHelper.accessor('last_name', {
            header: 'نام خانوادگی',
        }),
        columnHelper.accessor('code', {
            header: 'کد استاد',
        }),
        columnHelper.accessor('national_code', {
            header: 'کدملی',
        }),
        columnHelper.accessor('class_count', {
            header: 'تعداد کلاس',
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
                                component={Link}
                                href={Routes.AdminTeacherProfile(cell.row.original.code)}
                                leftSection={<IconUser size={19} />}
                                rightSection={<IconChevronLeft size={19} />}
                            >
                                ویرایش پروفایل
                            </Menu.Item>

                            <Menu.Item
                                onClick={() => {
                                    open()
                                    setRowDetail(cell.row.original)
                                }}
                                leftSection={<IconPlus size={19} />}
                            >
                                تخصیص کلاس
                            </Menu.Item>

                            {Boolean(cell.row.original.class_count) && (
                                <Menu.Item
                                    component={Link}
                                    href={Routes.AdminTeacherLessons(cell.row.original.code)}
                                    rightSection={<IconChevronLeft size={19} />}
                                    leftSection={<IconListCheck size={19} />}
                                >
                                    لیست کلاس‌ها
                                </Menu.Item>
                            )}

                            <hr />
                            <Menu.Item
                                onClick={() => {
                                    const { first_name, last_name, code } = cell.row.original
                                    deleteTeacherById({ first_name, last_name, code })
                                }}
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
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <>
            <Modal opened={opened} centered title='تخصیص کلاس' onClose={close}>
                <ClassAssignment rowDetail={rowDetail} close={close} />
            </Modal>

            <DTable data={table} minWidth={750} />
        </>
    )
}

export default Table
