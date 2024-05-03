import { AuthForm } from '@organisms/Auth'

const AuthTemplate = () => {
    return (
        <section className='w-full h-screen flex justify-center items-center'>
            <div className='bg-white shadow-sm w-[400px] p-6 rounded-lg flex flex-col gap-6'>
                <p className='font-semibold'>ورود به حساب کاربری</p>

                <hr />

                <AuthForm />
            </div>
        </section>
    )
}

export default AuthTemplate
