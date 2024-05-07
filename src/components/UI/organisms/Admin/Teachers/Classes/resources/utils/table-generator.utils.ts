import { type TDynamicTableWithZoneType } from '@core/types/dynamic-table-with-zone'
import { type TAdminTeacherClassesTableType } from '@core/types/table/adminTeacherClasses'

const tableDataGenerator = (data: TAdminTeacherClassesTableType[]) => {
    const result: TDynamicTableWithZoneType[] = []

    if (data) {
        data.forEach((singleClass) => {
            const provinceEntry: TDynamicTableWithZoneType = {
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
