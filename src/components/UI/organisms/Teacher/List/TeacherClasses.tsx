'use client'
import { useMemo } from 'react'
import { Menu } from '@mantine/core'
import { IconDownload } from '@tabler/icons-react'

import { DButton } from '@atoms/DButton'

import { exportToPDF } from '@core/utils/common/export-to-pdf'
import { useExportTable } from '@core/utils/hooks/use-export-table'

import { TeacherClassesTable } from './resources'
import { STATIC_TABLE_DATA } from './resources/components/Table/resources'
import tableDataGenerator from './resources/utils/table-generator.utils'

const TeacherClasses = () => {
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
                title: 'teacher classes',
            })
        }
    }
    return (
        <div className='w-full flex flex-col gap-6'>
            <div className='w-full flex  justify-end'>
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
            </div>

            <TeacherClassesTable />
        </div>
    )
}

export default TeacherClasses