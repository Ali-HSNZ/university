import { type TDynamicTableWithZoneType } from '@core/types/dynamic-table-with-zone'
import { type TAdminLessonsListTableType } from '@core/types/table/adminLessons'

const tableDataGenerator = (data: TAdminLessonsListTableType[]) => {
    const result: TDynamicTableWithZoneType[] = []

    if (data) {
        data.forEach((singleClass) => {
            const provinceEntry: TDynamicTableWithZoneType = {
                ['عنوان']: singleClass.title,
                ['کد استاندارد']: singleClass.code,
                ['نوع درس']: singleClass.lesson_type,
                ['واحد تئوری']: singleClass.theory_unit,
                ['واحد عملی']: singleClass.practical_unit,
            }
            result.push(provinceEntry)
        })
    }
    return result
}

export default tableDataGenerator
