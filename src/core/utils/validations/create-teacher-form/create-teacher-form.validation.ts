import * as Yup from 'yup'

import { validateNationalCode } from '../nationalCode'
const phoneNumberRegex = /^(\+98?)?{?(0?9[0-9]{9,9}}?)$/
const persianRegex = /^[\u0600-\u06FF\s]+$/
const persianTextAndEnglishNumberRegex = /^[\u0600-\u06FF\s0-9]+$/

const createTeacherFormSchema = Yup.object({
    first_name: Yup.string()
        .trim()
        .required('نام الزامی می‌باشد')
        .min(3, 'نام نمی‌تواند کم تر 3 نویسه باشد')
        .max(20, 'نام نمی‌تواند بیشتر از 20 نویسه باشد')
        .test('isValidFirstName', 'نام معتبر نیست', (value) => persianRegex.test(value)),

    last_name: Yup.string()
        .trim()
        .required('نام خانوادگی الزامی می‌باشد')
        .min(3, 'نام خانوادگی نمی‌تواند کم تر 3 نویسه باشد')
        .max(50, 'نام خانوادگی نمی‌تواند بیشتر از 50 نویسه باشد')
        .test('isValidLastName', 'نام خانوادگی معتبر نیست', (value) => persianRegex.test(value)),

    national_code: Yup.string()
        .required('کدملی الزامی می‌باشد')
        .test('isValidNational_code', 'کدملی معتبر نیست', (value) => validateNationalCode(value)),
    mobile: Yup.string()
        .trim()
        .required('شماره موبایل الزامی می‌باشد')
        .test('isValidMobile', 'شماره موبایل معتبر نیست', (value) => phoneNumberRegex.test(value)),
    birthDay: Yup.date().required('تاریخ تولد الزامی می‌باشد'),
    gender: Yup.string().required('جنسیت الزامی می‌باشد'),
    education: Yup.string().required('مدرک تحصیلی الزامی می‌باشد'),
    address: Yup.string()
        .required('آدرس الزامی می‌باشد')
        .min(3, 'آدرس نمی‌تواند کم از 3 نویسه باشد')
        .max(300, 'آدرس نمی‌تواند بیشتر از 300 نویسه باشد')
        .test('isValidAddress', 'آدرس معتبر نیست', (value) => persianTextAndEnglishNumberRegex.test(value)),
})

export default createTeacherFormSchema
