import React, { type FC } from 'react'
import { Table } from '@mantine/core'
import { flexRender } from '@tanstack/react-table'

import { type TCriticalAny } from '@core/types/critical-any'

import { type ITableProps } from './resources'

const DTable: FC<ITableProps> = ({ data, minWidth = undefined, maxHeight = undefined }) => {
    return (
        <Table.ScrollContainer mah={maxHeight} minWidth={minWidth} type='native'>
            <Table stickyHeader>
                <Table.Thead>
                    {data.getHeaderGroups().map((headerGroup: TCriticalAny, index: number) => (
                        <Table.Tr key={index}>
                            {headerGroup.headers.map((header: TCriticalAny, index: number) => {
                                return (
                                    <Table.Th
                                        classNames={{
                                            th: 'text-xs p-4 leading-5 md:text-sm font-medium whitespace-nowrap',
                                        }}
                                        key={index}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </Table.Th>
                                )
                            })}
                        </Table.Tr>
                    ))}
                </Table.Thead>
                <Table.Tbody className='bg-white'>
                    {data.getRowModel().rows.map((row: TCriticalAny, index: number) => (
                        <Table.Tr py={20} classNames={{ tr: 'border-[#F0F0F0]' }} key={index}>
                            {row.getVisibleCells().map((cell: TCriticalAny, index: number) => (
                                <Table.Td classNames={{ td: 'text-xs leading-5 md:text-sm p-3.5' }} key={index}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Table.Td>
                            ))}
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}

export default DTable
