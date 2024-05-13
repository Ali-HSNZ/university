import { useMemo } from 'react'
import { Menu } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

import { EmptyBoundary } from '@partials/boundaries/EmptyBoundary'
import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { DButton } from '@atoms/DButton'

import { getClassesListFn } from '@api/get-classes-list'

import { QueryKeys } from '@core/enums/query-keys'
import { type TClassesListFnType } from '@core/types/data/classes-list'
import { exportToPDF } from '@core/utils/common/export-to-pdf'
import { useExportTable } from '@core/utils/hooks/use-export-table'

import { AdminManageClassesListTable, tableDataGenerator } from './resources'

const AdminClassesList = () => {
    const { isFetching, isError, isSuccess, data } = useQuery<TClassesListFnType[]>({
        queryKey: [QueryKeys.ClassesList],
        queryFn: () => getClassesListFn(),
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
                title: 'class',
            })
        }
    }
    return (
        <div className='w-full flex flex-col gap-6'>
            <div className='w-full flex items-center justify-between'>
                <p>لیست کلاس ها</p>
                <Menu>
                    <Menu.Target>
                        <DButton leftSection={<IconDownload />} variant='light'>
                            خروجی جدول
                        </DButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={onDownloadPdf}>خروجی فایل PDF</Menu.Item>
                        <Menu.Item onClick={() => onDownloadExcel({ data: tableData, name: 'class' })}>
                            خروجی فایل Excel
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            {/* table */}
            <DFetchingContainer
                isError={isError}
                isFetching={isFetching}
                isSuccess={isSuccess}
                emptyBoundary={data?.length === 0 && <EmptyBoundary />}
            >
                <AdminManageClassesListTable data={data as TClassesListFnType[]} />
            </DFetchingContainer>
        </div>
    )
}

export default AdminClassesList
