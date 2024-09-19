'use client'
import { useMemo } from 'react'
import { Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDatabaseImport, IconDownload } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

import { EmptyBoundary } from '@partials/boundaries/EmptyBoundary'
import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { DButton } from '@atoms/DButton'
import { DModal } from '@atoms/DModal'

import { getTeacherClassesListFn } from '@api/get-teacher-classes-list'

import { QueryKeys } from '@core/enums/query-keys'
import { type TTeacherClassesListFnType } from '@core/types/data/teacher-class-list'
import { exportToPDF } from '@core/utils/common/export-to-pdf'
import { useExportTable } from '@core/utils/hooks/use-export-table'

import { TeacherClassesTable, TeacherCreateClassUploadModal } from './resources'
import tableDataGenerator from './resources/utils/table-generator.utils'

const TeacherClasses = () => {
    const { isFetching, isError, isSuccess, data } = useQuery<TTeacherClassesListFnType[]>({
        queryKey: [QueryKeys.TeacherClassesList],
        queryFn: () => getTeacherClassesListFn(),
    })
    const [opened, { open, close }] = useDisclosure()

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
                title: 'teacher classes',
            })
        }
    }
    return (
        <>
            <section className='w-full flex flex-col gap-6'>
                <div className='w-full gap-6 flex justify-end'>
                    <DButton onClick={open} type='button' variant='subtle' leftSection={<IconDatabaseImport />}>
                        آپلود Excel
                    </DButton>
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
                <DFetchingContainer
                    isError={isError}
                    isFetching={isFetching}
                    isSuccess={isSuccess}
                    emptyBoundary={data?.length === 0 && <EmptyBoundary />}
                >
                    <TeacherClassesTable data={data as TTeacherClassesListFnType[]} />
                </DFetchingContainer>
            </section>

            <DModal opened={opened} title='آپلود فایل Excel' centered onClose={close}>
                <TeacherCreateClassUploadModal onClose={close} />
            </DModal>
        </>
    )
}

export default TeacherClasses
