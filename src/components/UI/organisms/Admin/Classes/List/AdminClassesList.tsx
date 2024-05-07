import { useMemo } from 'react'
import { Menu } from '@mantine/core'

import { DButton } from '@atoms/DButton'

import { exportToPDF } from '@core/utils/common/export-to-pdf'
import { useExportTable } from '@core/utils/hooks/use-export-table'

import { AdminManageClassesListTable, tableDataGenerator } from './resources'
import { STATIC_TABLE_DATA } from './resources/components/Table/resources'

const AdminClassesList = () => {
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
                        <DButton variant='light'>خروجی جدول</DButton>
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
            <AdminManageClassesListTable />
        </div>
    )
}

export default AdminClassesList
