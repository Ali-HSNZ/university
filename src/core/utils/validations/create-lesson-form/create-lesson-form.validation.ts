import * as Yup from 'yup'

const persianRegex = /^[\u0600-\u06FF\s]+$/
const onlyDigits = /^\d+$/
const persianTextAndEnglishNumberRegex = /^[\u0600-\u06FF\s0-9]+$/

const createLessonFormSchema = Yup.object({
    title: Yup.string()
        .trim()
        .required('عنوان درس الزامی می‌باشد')
        .min(2, 'عنوان درس کم تر 2 نویسه باشد')
        .max(50, 'عنوان درس بیشتر از 50 نویسه باشد')
        .test('isValidLessonName', 'عنوان درس معتبر نیست', (value) => persianTextAndEnglishNumberRegex.test(value)),
    type: Yup.string()
        .trim()
        .required('نوع درس الزامی می‌باشد')
        .min(3, 'نوع درس نمی‌تواند کم تر 3 نویسه باشد')
        .max(100, 'نوع درس نمی‌تواند بیشتر از 100 نویسه باشد')
        .test('isValidLessonType', 'نوع درس معتبر نیست', (value) => persianRegex.test(value)),

    theory_unit: Yup.string()
        .matches(onlyDigits, { message: 'واحد تئوری معتبر نمی‌باشد' })
        .required('جنسیت الزامی می‌باشد'),
    practical_unit: Yup.string().required('واحد عملی الزامی می‌باشد'),
})

export default createLessonFormSchema
