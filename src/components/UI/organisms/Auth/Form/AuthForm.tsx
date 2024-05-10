import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'

import { DField } from '@molecules/DField'

import { DButton } from '@atoms/DButton'
import { DTextInput } from '@atoms/DTextInput'

import { authMutationFn } from '@api/auth'

import { setCookieStorageItem } from '@core/services/storage'
import { type IAuthMutationFnProps } from '@core/types/data/auth'
import { type TLoginFormSchemaType } from '@core/types/forms-schema/login-form'
import { loginFormSchema } from '@core/utils/validations/login-form'

const AuthForm = () => {
    const { push } = useRouter()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TLoginFormSchemaType>({
        defaultValues: {
            national_code: '',
            pass: '',
        },
        resolver: yupResolver(loginFormSchema),
    })

    const { isPending, isSuccess, mutate } = useMutation({
        mutationFn: authMutationFn,
        onSuccess: (res: IAuthMutationFnProps) => {
            toast.success(res.message)
            setCookieStorageItem('Secure-KY', res.data.token, {
                secure: true,
                sameSite: 'Strict',
                expires: 24 * 60 * 60 * 1000,
            })
            push(`/${res.data.userType}`)
        },
        onError: (err: IAuthMutationFnProps) => {
            toast.error(err.message)
        },
    })

    return (
        <form onSubmit={handleSubmit((formValue) => mutate(formValue))}>
            <div className='w-full flex flex-col gap-4'>
                <Controller
                    name='national_code'
                    control={control}
                    render={({ field }) => (
                        <DField fieldName={field.name} fieldError={errors}>
                            <DTextInput label='کد ملی' maxLength={10} {...field} />
                        </DField>
                    )}
                />
                <Controller
                    name='pass'
                    control={control}
                    render={({ field }) => (
                        <DField fieldName={field.name} fieldError={errors}>
                            <DTextInput label='رمز عبور' type='password' maxLength={30} {...field} />
                        </DField>
                    )}
                />
            </div>

            <DButton loading={isPending || isSuccess} type='submit' className='mt-6' fullWidth>
                ورود
            </DButton>
        </form>
    )
}

export default AuthForm
