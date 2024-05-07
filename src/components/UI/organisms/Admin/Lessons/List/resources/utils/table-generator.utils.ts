import { type DynamicTableWithZoneType } from '@core/types/dynamic-table-with-zone'
import { type AdminLessonsListTable } from '@core/types/table/adminLessons'

const tableDataGenerator = (data: AdminLessonsListTable[]) => {
    const result: DynamicTableWithZoneType[] = []

    if (data) {
        data.forEach((singleClass) => {
            const provinceEntry: DynamicTableWithZoneType = {
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
