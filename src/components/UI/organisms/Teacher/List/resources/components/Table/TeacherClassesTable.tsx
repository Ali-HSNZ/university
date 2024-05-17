import { type FC } from 'react'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { type TCriticalAny } from '@core/types/critical-any'
import { type TTeacherClassesListFnType } from '@core/types/data/teacher-class-list'

import { type ITeacherClassesTableProps } from './resources'

interface ITabelDataType extends TTeacherClassesListFnType {
    operators: unknown
    index: number
}

const Table: FC<ITeacherClassesTableProps> = ({ data }) => {
    const columnHelper = createColumnHelper<ITabelDataType>()

    const columns: TCriticalAny[] = [
        // Add the index column
        columnHelper.accessor('index', {
            header: 'ردیف',
            cell: ({ cell }) => cell.row.index + 1,
        }),
        columnHelper.accessor('lesson_title', {
            header: 'نام درس',
        }),
        columnHelper.accessor('start_time', {
            header: 'ساعت شروع کلاس',
        }),
        columnHelper.accessor('end_time', {
            header: 'ساعت پایان کلاس',
        }),
        columnHelper.accessor('day', {
            header: 'روز برگزاری کلاس',
        }),
        columnHelper.accessor('test_date', {
            header: 'تاریخ آزمون',
            cell: ({ row }) => row.original.test_date || 'نامشخص',
        }),
        columnHelper.accessor('test_time', {
            header: 'ساعت برگزاری آزمون',
            cell: ({ row }) => row.original.test_time || 'نامشخص',
        }),
    ]

    const table = useReactTable({
        data: data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return <DTable data={table} minWidth={800} />
}

export default Table
