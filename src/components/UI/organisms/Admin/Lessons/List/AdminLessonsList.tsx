import { useMemo } from 'react'
import { Menu } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

import { EmptyBoundary } from '@partials/boundaries/EmptyBoundary'
import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { DButton } from '@atoms/DButton'

import { getLessonsListFn } from '@api/get-lessons-list'

import { QueryKeys } from '@core/enums/query-keys'
import type TLessonListFnType from '@core/types/data/lessons-list/lessons-list.type'
import { exportToPDF } from '@core/utils/common/export-to-pdf'
import { useExportTable } from '@core/utils/hooks/use-export-table'

import { AdminManageLessonsListTable, tableDataGenerator } from './resources'

const AdminLessonsList = () => {
    const { isFetching, isError, isSuccess, data } = useQuery<TLessonListFnType[]>({
        queryKey: [QueryKeys.LessonsList],
        queryFn: () => getLessonsListFn(),
    })

    const tableData = useMemo(() => {
        if (data) return tableDataGenerator(data)
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
                title: 'lessons',
            })
        }
    }

    return (
        <div className='w-full flex flex-col gap-6'>
            <div className='w-full flex items-center justify-between'>
                <p>لیست دروس</p>
                <Menu>
                    <Menu.Target>
                        <DButton leftSection={<IconDownload />} variant='light'>
                            خروجی جدول
                        </DButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={onDownloadPdf}>خروجی فایل PDF</Menu.Item>
                        <Menu.Item onClick={() => onDownloadExcel({ data: tableData, name: 'lessons' })}>
                            خروجی فایل Excel
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            <DFetchingContainer
                isError={isError}
                isFetching={isFetching}
                isSuccess={isSuccess}
                emptyBoundary={data?.length === 0 && <EmptyBoundary />}
            >
                <AdminManageLessonsListTable data={data as TLessonListFnType[]} />
            </DFetchingContainer>
        </div>
    )
}

export default AdminLessonsList
