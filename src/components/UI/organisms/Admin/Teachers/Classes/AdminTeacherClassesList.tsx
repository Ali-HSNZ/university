import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Menu } from '@mantine/core'
import { IconArrowBack, IconDownload } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

import { EmptyBoundary } from '@partials/boundaries/EmptyBoundary'
import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { DButton } from '@atoms/DButton'

import { getTeacherClassesListFn } from '@api/get-teacher-classes-list'

import { QueryKeys } from '@core/enums/query-keys'
import { type TTeacherClassesListType, type TTeacherSingleClassType } from '@core/types/data/teacher-classes-list'
import { exportToPDF } from '@core/utils/common/export-to-pdf'
import { useExportTable } from '@core/utils/hooks/use-export-table'

import { AdminTeacherClassesTable, tableDataGenerator } from './resources'

const AdminTeacherClassesList = () => {
    const { push } = useRouter()
    const path = useParams()

    const dynamicTeacherId: string = path?.teacherId ? String(path.teacherId) : ''

    const { isFetching, isError, isSuccess, data } = useQuery<TTeacherClassesListType>({
        queryKey: [QueryKeys.TeacherClassesList, { dynamicTeacherId }],
        queryFn: () => getTeacherClassesListFn(dynamicTeacherId),
    })

    const tableData = useMemo(() => {
        if (data) {
            return tableDataGenerator(data.classes)
        }
    }, [data])

    const { onDownloadExcel } = useExportTable()

    const onDownloadPdf = () => {
        if (tableData) {
            const headers = Object.keys(tableData[0]).reverse()
            const headersTitle = headers.concat(['ردیف'])

            const data = tableData.map((elt, index) =>
                headers.map((singleHeader) => String(elt[singleHeader])).concat([`${index + 1}`])
            )

            exportToPDF({
                headers: headersTitle,
                tableData: data,
                title: 'teacher classes',
            })
        }
    }

    return (
        <section className='flex flex-col gap-6'>
            <div className='w-full flex justify-between items-center'>
                <p>
                    کلاس های استاد {data?.teacher.first_name} {data?.teacher.last_name}
                </p>

                <div className='flex gap-6'>
                    <Menu>
                        <Menu.Target>
                            <DButton leftSection={<IconDownload />} variant='light'>
                                خروجی جدول
                            </DButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={onDownloadPdf}>خروجی فایل PDF</Menu.Item>
                            <Menu.Item onClick={() => onDownloadExcel({ data: tableData, name: 'teacher classes' })}>
                                خروجی فایل Excel
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                    <DButton onClick={() => push('/admin/teachers')} variant='outline' leftSection={<IconArrowBack />}>
                        لیست اساتید
                    </DButton>
                </div>
            </div>
            <DFetchingContainer
                isError={isError}
                isFetching={isFetching}
                isSuccess={isSuccess}
                emptyBoundary={data?.classes?.length === 0 && <EmptyBoundary />}
            >
                <AdminTeacherClassesTable
                    teacher_code={data?.teacher.teacher_code as number}
                    data={data?.classes as TTeacherSingleClassType[]}
                />
            </DFetchingContainer>
        </section>
    )
}

export default AdminTeacherClassesList
