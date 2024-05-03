import { type RefObject } from 'react'

import { type TCriticalAny } from '@core/types/critical-any'

interface ITableProps {
    table: TCriticalAny
    tableRef?: RefObject<HTMLTableElement>
}

export default ITableProps
