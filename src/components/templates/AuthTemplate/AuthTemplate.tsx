import { DButton } from '@atoms/DButton'
import { DTextInput } from '@atoms/DTextInput'

const AuthTemplate = () => {
    return (
        <section className='w-full h-screen flex justify-center items-center'>
            <div className='bg-white w-[400px] p-6 rounded-lg'>
                <p className='font-semibold'>ورود به حساب کاربری</p>
                <hr className='mt-6' />
                <div className='w-full mt-6 flex flex-col gap-4'>
                    <DTextInput type='number' label=' کد ملی' />
                    <DTextInput label=' رمز عبور' />
                </div>
                <DButton className='mt-6' fullWidth>
                    ورود
                </DButton>
            </div>
        </section>
    )
}

export default AuthTemplate
