import { type TClassesListFnType } from '@core/types/data/classes-list'
import { type TDynamicTableWithZoneType } from '@core/types/dynamic-table-with-zone'

const tableDataGenerator = (data: TClassesListFnType[]) => {
    const result: TDynamicTableWithZoneType[] = []

    if (data) {
        data.forEach((singleClass) => {
            const provinceEntry: TDynamicTableWithZoneType = {
                ['درس']: singleClass.title,
                ['ساعت شروع']: singleClass.start_time,
                ['ساعت پایان']: singleClass.end_time,
                ['روز برگزاری']: singleClass.day,
                ['تاریخ آزمون']: singleClass?.test_date || 'نامشخص',
                ['ساعت برگزاری آزمون']: singleClass?.test_time || 'نامشخص',
            }
            result.push(provinceEntry)
        })
    }
    return result
}

export default tableDataGenerator
