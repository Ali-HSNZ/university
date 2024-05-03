import { type FC } from 'react'
import { type TableData } from '@mantine/core'
import { flexRender, type HeaderGroup } from '@tanstack/react-table'

import { DScrollbar } from '@atoms/DScrollbar'

import { type TCriticalAny } from '@core/types/critical-any'

import { generateTableBody, type ITableProps } from './resources'

const DTable: FC<ITableProps> = ({ table }) => {
    return (
        <>
            <div className='hidden md:block w-full overflow-auto max-h-[400px]'>
                <table className='w-full relative border-separate  border-spacing-y-[7px] '>
                    <thead className='sticky top-0 right-0 w-full p-6'>
                        {table.getHeaderGroups().map((headerGroup: HeaderGroup<TableData>) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className='t-body1Strong text-nowrap text-typography bg-general-brandBackground   first:rounded-r-lg first:text-right last:rounded-l-lg last:border-none border-l border-light-blue first:w-16'
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className='tbody text-center'>
                        {table.getRowModel().rows.map((row: TCriticalAny) => (
                            <tr key={row.id} className=' w-full -my-1'>
                                {row.getVisibleCells().map((cell: TCriticalAny) => (
                                    <td
                                        className='t-body1 bg-general-surface text-typography-350 py-3 px-5 first:rounded-r-lg first:text-right last:rounded-l-lg last:border-none border-l border-light-blue-200 first:w-16'
                                        key={cell.id}
                                    >
                                        {generateTableBody(
                                            cell.getContext().column.id,
                                            cell.getContext().column.id === 'index'
                                                ? cell.getContext().row.index + 1
                                                : cell.getContext().getValue()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className=' md:hidden w-full'>
                <DScrollbar maxHeight={450}>
                    <div className='flex md:hidden flex-col gap-y-2 text-sm font-medium px-2'>
                        {table.getRowModel().rows.map((row: TCriticalAny) => (
                            <ul key={row.id} className='border rounded-lg '>
                                {row.getVisibleCells().map(
                                    (cell: TCriticalAny, index: number) =>
                                        cell.column.columnDef.accessorKey !== 'index' && (
                                            <li key={cell.id} className={`grid grid-cols-2 w-full first:`}>
                                                <div
                                                    className={`p-3 text-general-brand bg-light-blue-200 ${
                                                        index !== row.getVisibleCells().length - 1
                                                            ? 'border-b border-primary-100'
                                                            : ''
                                                    }`}
                                                >
                                                    {cell.column.columnDef.header}
                                                </div>
                                                <div
                                                    className={`p-3 t-body1   ${
                                                        index !== row.getVisibleCells().length - 1
                                                            ? 'border-b border-[#E0E3E7]'
                                                            : ''
                                                    }`}
                                                >
                                                    {generateTableBody(
                                                        cell.getContext().column.id,
                                                        cell.getContext().column.id === 'index'
                                                            ? cell.getContext().row.index + 1
                                                            : cell.getContext().getValue()
                                                    )}
                                                </div>
                                            </li>
                                        )
                                )}
                            </ul>
                        ))}
                    </div>
                </DScrollbar>
            </div>
        </>
    )
}

export default DTable
