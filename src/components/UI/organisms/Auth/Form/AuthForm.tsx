import { DButton } from '@atoms/DButton'
import { DTextInput } from '@atoms/DTextInput'

const AuthForm = () => {
    return (
        <form action=''>
            <div className='w-full flex flex-col gap-4'>
                <DTextInput type='number' label=' کد ملی' />
                <DTextInput label=' رمز عبور' />
            </div>

            <DButton className='mt-6' fullWidth>
                ورود
            </DButton>
        </form>
    )
}

export default AuthForm
