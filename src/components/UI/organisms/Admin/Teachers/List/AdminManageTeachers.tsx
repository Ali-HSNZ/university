import { useMemo } from 'react'
import { Menu } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

import { EmptyBoundary } from '@partials/boundaries/EmptyBoundary'
import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { DButton } from '@atoms/DButton'

import { getTeachersListFn } from '@api/get-teachers-list'

import { QueryKeys } from '@core/enums/query-keys'
import { type TTeachersListFnType } from '@core/types/data/teachers-list'
import { exportToPDF } from '@core/utils/common/export-to-pdf'
import { useExportTable } from '@core/utils/hooks/use-export-table'

import { AdminManageTeacherListTable } from './resources'
import tableDataGenerator from './resources/utils/table-generator.utils'

const AdminManageTeachersList = () => {
    const { onDownloadExcel } = useExportTable()

    const { isFetching, isError, isSuccess, data } = useQuery<TTeachersListFnType[]>({
        queryKey: [QueryKeys.TeachersList],
        queryFn: () => getTeachersListFn(),
    })

    const tableData = useMemo(() => {
        if (data) return tableDataGenerator(data)
    }, [data])

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
                title: 'teachers',
            })
        }
    }

    return (
        <div className='w-full flex flex-col gap-6'>
            <div className='w-full flex items-center justify-between'>
                <p>لیست اساتید</p>
                <Menu>
                    <Menu.Target>
                        <DButton leftSection={<IconDownload />} variant='light'>
                            خروجی جدول
                        </DButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={onDownloadPdf}>خروجی فایل PDF</Menu.Item>
                        <Menu.Item onClick={() => onDownloadExcel({ data: tableData, name: 'teachers' })}>
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
                <AdminManageTeacherListTable data={data as TTeachersListFnType[]} />
            </DFetchingContainer>
        </div>
    )
}

export default AdminManageTeachersList
