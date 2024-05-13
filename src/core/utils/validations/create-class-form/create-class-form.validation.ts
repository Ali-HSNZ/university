import * as Yup from 'yup'

const createClassFormSchema = Yup.object({
    lesson_id: Yup.string().required('نام درس الزامی می‌باشد'),
    end_time: Yup.string().required('ساعت شروع کلاس الزامی می‌باشد'),
    start_time: Yup.string().required('ساعت پایان کلاس الزامی می‌باشد'),
    day: Yup.string().required('روز برگزاری کلاس الزامی می‌باشد'),
    test_time: Yup.string().nullable(),
    test_date: Yup.string().nullable(),
})

export default createClassFormSchema
