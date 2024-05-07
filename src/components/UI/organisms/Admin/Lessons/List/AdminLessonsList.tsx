import { useMemo } from 'react'
import { Menu } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'

import { DButton } from '@atoms/DButton'

import { exportToPDF } from '@core/utils/common/export-to-pdf'
import { useExportTable } from '@core/utils/hooks/use-export-table'

import { AdminManageLessonsListTable, tableDataGenerator } from './resources'
import { STATIC_TABLE_DATA } from './resources/components/Table/resources'

const AdminLessonsList = () => {
    const tableData = useMemo(() => {
        return tableDataGenerator(STATIC_TABLE_DATA)
    }, [])

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

            <AdminManageLessonsListTable />
        </div>
    )
}

export default AdminLessonsList
