import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconArrowBack } from '@tabler/icons-react'
import { IconCheck } from '@tabler/icons-react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { DFetchingContainer } from '@partials/container/DFetchingContainer'

import { DField } from '@molecules/DField'

import { DButton } from '@atoms/DButton'
import { DSelect } from '@atoms/DSelect'
import { DTextInput } from '@atoms/DTextInput'

import { getAdminTeacherProfileFn } from '@api/get-admin-teacher-profile'
import { updateTeacherMutationFn } from '@api/update-teacher'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type TAdminTeacherProfileInfoTypes } from '@core/types/data/teacher-profile-info'
import { type TUpdateTeacherForm } from '@core/types/forms-schema/update-teacher-profile-form'
import { updateTeacherFormSchema } from '@core/utils/validations/update-teacher-profile'

const AdminTeacherProfileTemplate = ({ teacherId }: { teacherId: string }) => {
    const { isFetching, isError, isSuccess, data } = useQuery<TAdminTeacherProfileInfoTypes>({
        queryKey: [QueryKeys.AdminTeacherProfileInfo],
        queryFn: () => getAdminTeacherProfileFn(teacherId),
    })

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<TUpdateTeacherForm>({
        resolver: yupResolver(updateTeacherFormSchema),
    })

    const { isPending, mutate } = useMutation({
        mutationFn: (values: TUpdateTeacherForm) => updateTeacherMutationFn(data?.userId || '', values),
        onSuccess: (res) => {
            toast.success(res.message)
        },
        onError: (err: TCriticalAny) => {
            if (err.code === 400) {
                const errors = err.errors
                for (const [key, value] of Object.entries(errors)) {
                    setError(key as keyof TUpdateTeacherForm, { type: 'custom', message: value as string })
                }
            } else {
                toast.error(err.message)
            }
        },
    })

    return (
        <section className='flex flex-col gap-6'>
            <div className='w-full flex justify-between items-center'>
                <p>پروفایل استاد</p>
                <DButton component={Link} href={'/admin/teachers'} variant='outline' leftSection={<IconArrowBack />}>
                    لیست اساتید
                </DButton>
            </div>

            <DFetchingContainer isFetching={isFetching} isError={isError} isSuccess={isSuccess}>
                <form onSubmit={handleSubmit((formValues) => mutate(formValues))} className='bg-white  p-6'>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-9'>
                        <Controller
                            name='first_name'
                            control={control}
                            defaultValue={data?.first_name || ''}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DTextInput maxLength={20} label='نام' withAsterisk {...field} />
                                    </DField>
                                )
                            }}
                        />
                        <Controller
                            name='last_name'
                            control={control}
                            defaultValue={data?.last_name || ''}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DTextInput maxLength={50} label='نام خانوادگی' withAsterisk {...field} />
                                    </DField>
                                )
                            }}
                        />
                        <Controller
                            name='national_code'
                            control={control}
                            defaultValue={data?.national_code || ''}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DTextInput maxLength={10} label='کد ملی' withAsterisk {...field} />
                                    </DField>
                                )
                            }}
                        />
                        <Controller
                            name='mobile'
                            control={control}
                            defaultValue={data?.mobile || ''}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DTextInput maxLength={11} label='شماره موبایل' withAsterisk {...field} />
                                    </DField>
                                )
                            }}
                        />

                        <Controller
                            name='gender'
                            control={control}
                            defaultValue={data?.gender.trim() || ''}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DSelect withAsterisk label='جنسیت' data={['مرد', 'زن']} {...field} />
                                    </DField>
                                )
                            }}
                        />

                        <Controller
                            name='education'
                            control={control}
                            defaultValue={data?.education || ''}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DSelect
                                            withAsterisk
                                            data={['کاردانی', 'کارشناسی', 'کارشناسی ارشد', 'دکترا', 'فوق دکترا']}
                                            label='مدرک تحصیلی'
                                            {...field}
                                        />
                                    </DField>
                                )
                            }}
                        />

                        <Controller
                            name='pass'
                            control={control}
                            defaultValue={data?.pass || ''}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DTextInput label='رمزعبور' withAsterisk {...field} />
                                    </DField>
                                )
                            }}
                        />

                        <Controller
                            name='address'
                            control={control}
                            defaultValue={data?.address || ''}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DTextInput label='آدرس' withAsterisk {...field} />
                                    </DField>
                                )
                            }}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <DButton loading={isPending} type='submit' leftSection={<IconCheck />}>
                            ذخیره تغییرات
                        </DButton>
                    </div>
                </form>
            </DFetchingContainer>
        </section>
    )
}

export default AdminTeacherProfileTemplate
