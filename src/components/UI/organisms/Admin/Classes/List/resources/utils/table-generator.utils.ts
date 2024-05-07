import { type DynamicTableWithZoneType } from '@core/types/dynamic-table-with-zone'
import { type AdminClassesListTable } from '@core/types/table/adminClasses'

const tableDataGenerator = (data: AdminClassesListTable[]) => {
    const result: DynamicTableWithZoneType[] = []

    if (data) {
        data.forEach((singleClass) => {
            const provinceEntry: DynamicTableWithZoneType = {
                ['نام درس']: singleClass.title,
                ['ساعت شروع کلاس']: singleClass.start_time,
                ['ساعت پایان کلاس']: singleClass.end_time,
                ['روز برگزاری کلاس']: singleClass.day,
                ['تاریخ آزمون']: singleClass.test_date,
                ['ساعت برگزاری آزمون']: singleClass.test_time,
            }
            result.push(provinceEntry)
        })
    }
    return result
}

export default tableDataGenerator
