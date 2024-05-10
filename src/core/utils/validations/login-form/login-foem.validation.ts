import * as Yup from 'yup'

import { validateNationalCode } from '../nationalCode'

const loginFormSchema = Yup.object({
    national_code: Yup.string()
        .required('کدملی الزامی می‌باشد')
        .test('isValidNational_code', 'کدملی معتبر نیست', (value) => validateNationalCode(value)),
    pass: Yup.string().required('رمز عبور را وارد کنید'),
})

export default loginFormSchema
