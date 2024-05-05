import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { DTable } from '@molecules/DTable'

import { type TCriticalAny } from '@core/types/critical-any'

import { STATIC_TABLE_DATA } from './resources'

const Table = () => {
    const columnHelper = createColumnHelper()

    const columns: TCriticalAny[] = [
        // Add the index column
        columnHelper.accessor('index', {
            header: 'ردیف',
            cell: ({ cell }) => cell.row.index + 1,
        }),
        columnHelper.accessor('title', {
            header: 'عنوان',
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
            header: 'تاریخ  آزمون',
        }),
        columnHelper.accessor('unit', {
            header: 'واحد',
        }),
    ]

    const table = useReactTable({
        data: STATIC_TABLE_DATA,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return <DTable data={table} minWidth={800} />
}

export default Table
