import { type TDynamicTableWithZoneType } from '@core/types/dynamic-table-with-zone'
import { type TAdminTeachersListTableType } from '@core/types/table/adminTeachersList'

const tableDataGenerator = (data: TAdminTeachersListTableType[]) => {
    const result: TDynamicTableWithZoneType[] = []

    if (data) {
        data.forEach((singleClass) => {
            const provinceEntry: TDynamicTableWithZoneType = {
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
