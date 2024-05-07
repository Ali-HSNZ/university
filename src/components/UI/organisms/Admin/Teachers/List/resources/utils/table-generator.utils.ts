import { type DynamicTableWithZoneType } from '@core/types/dynamic-table-with-zone'
import { type AdminTeachersListTable } from '@core/types/table/adminTeachersList'

const tableDataGenerator = (data: AdminTeachersListTable[]) => {
    const result: DynamicTableWithZoneType[] = []

    if (data) {
        data.forEach((singleClass) => {
            const provinceEntry: DynamicTableWithZoneType = {
                ['نام']: singleClass.first_name,
                ['نام خانوادگی']: singleClass.last_name,
                ['کد استاد']: singleClass.code,
                ['وضعیت تدریس']: singleClass.status === 1 ? 'در حال فعالیت' : 'عدم فعالیت',
                ['تعداد کلاس']: singleClass.class_count,
            }
            result.push(provinceEntry)
        })
    }
    return result
}

export default tableDataGenerator
