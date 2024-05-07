import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Menu } from '@mantine/core'
import { IconArrowBack, IconDownload } from '@tabler/icons-react'

import { DButton } from '@atoms/DButton'

import { exportToPDF } from '@core/utils/common/export-to-pdf'
import { useExportTable } from '@core/utils/hooks/use-export-table'

import { AdminTeacherClassesTable, tableDataGenerator } from './resources'
import { STATIC_TABLE_DATA } from './resources/components/Table/resources'

const AdminTeacherClassesList = () => {
    const { push } = useRouter()

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
        <section className='flex flex-col gap-6'>
            <div className='w-full flex justify-between items-center'>
                <p>کلاس های استاد محمد رضوی</p>
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

            <AdminTeacherClassesTable />
        </section>
    )
}

export default AdminTeacherClassesList
