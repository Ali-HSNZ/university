import { type TTeacherClassesListFnType } from '@core/types/data/teacher-class-list'
import { type TDynamicTableWithZoneType } from '@core/types/dynamic-table-with-zone'

const tableDataGenerator = (data: TTeacherClassesListFnType[]) => {
    const result: TDynamicTableWithZoneType[] = []

    if (data) {
        data.forEach((singleClass) => {
            const provinceEntry: TDynamicTableWithZoneType = {
                ['نام درس']: singleClass.lesson_title,
                ['ساعت شروع کلاس']: singleClass.start_time,
                ['ساعت پایان کلاس']: singleClass.end_time,
                ['روز برگزاری کلاس']: singleClass.day,
                ['تاریخ آزمون']: singleClass?.test_date || 'نامشخص',
                ['ساعت برگزاری آزمون']: singleClass?.test_time || 'نامشخص',
            }
            result.push(provinceEntry)
        })
    }
    return result
}

export default tableDataGenerator
