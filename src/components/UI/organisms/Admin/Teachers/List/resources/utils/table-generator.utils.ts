import { type TTeachersListFnType } from '@core/types/data/teachers-list'
import { type TDynamicTableWithZoneType } from '@core/types/dynamic-table-with-zone'

const tableDataGenerator = (data: TTeachersListFnType[]) => {
    const result: TDynamicTableWithZoneType[] = []

    if (data) {
        data.forEach((singleClass) => {
            const provinceEntry: TDynamicTableWithZoneType = {
                ['نام']: singleClass.first_name,
                ['نام خانوادگی']: singleClass.last_name,
                ['کد استاد']: singleClass.code,
                ['کدملی']: singleClass.national_code,
                ['تعداد کلاس']: singleClass.class_count,
            }
            result.push(provinceEntry)
        })
    }
    return result
}

export default tableDataGenerator
