import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useDisclosure } from '@mantine/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCheck, IconDatabaseImport } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DField } from '@molecules/DField'

import { DButton } from '@atoms/DButton'
import { DDatePicker } from '@atoms/DDatePicker'
import { DModal } from '@atoms/DModal'
import { DSelect } from '@atoms/DSelect'
import { DTextInput } from '@atoms/DTextInput'

import { createTeacherMutationFn } from '@api/create-teacher'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IBaseMutationFnProps } from '@core/types/data/base-response'
import { type TCreateTeacherForm } from '@core/types/forms-schema/create-teacher-form'
import { createTeacherFormSchema } from '@core/utils/validations/create-teacher-form'

import { AdminCreateTeacherUploadModal } from './resources'

const AdminCreateTeacher = () => {
    const [opened, { open, close }] = useDisclosure()

    const {
        control,
        handleSubmit,
        setError,
        reset,
        setValue,
        formState: { errors },
    } = useForm<TCreateTeacherForm>({
        defaultValues: {
            birthDay: '',
            address: '',
            education: '',
            first_name: '',
            gender: '',
            last_name: '',
            mobile: '',
            national_code: '',
        },
        resolver: yupResolver(createTeacherFormSchema),
    })

    const queryClient = useQueryClient()

    const { isPending, mutate } = useMutation({
        mutationFn: createTeacherMutationFn,
        onSuccess: (res: IBaseMutationFnProps) => {
            toast.success(res.message)
            reset()
            setValue('education', null as TCriticalAny)
            setValue('gender', null as TCriticalAny)
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.TeachersList],
            })
        },
        onError: (err: TCriticalAny) => {
            if (err.code === 400) {
                const errors = err.errors
                for (const [key, value] of Object.entries(errors)) {
                    setError(key as keyof TCreateTeacherForm, { type: 'custom', message: value as string })
                }
            } else {
                toast.error(err.message)
            }
        },
    })

    return (
        <>
            <section className='flex flex-col gap-6'>
                <p>ثبت استاد</p>

                <form
                    onSubmit={handleSubmit((formValue) => mutate(formValue))}
                    className='bg-white flex flex-col gap-6 p-6'
                >
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        <Controller
                            name='first_name'
                            control={control}
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
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DTextInput maxLength={11} label='شماره موبایل' withAsterisk {...field} />
                                    </DField>
                                )
                            }}
                        />

                        <Controller
                            name='birthDay'
                            control={control}
                            render={({ field: { name, onChange, ...res } }) => {
                                return (
                                    <DField fieldName={name} fieldError={errors}>
                                        <DDatePicker
                                            onChange={onChange}
                                            // 5.676e11 => 18y
                                            maxDate={new Date(new Date().getTime() - 5.676e11)}
                                            onOpenPickNewDate={false}
                                            label='تاریخ تولد'
                                            withAsterisk
                                            {...res}
                                        />
                                    </DField>
                                )
                            }}
                        />

                        <Controller
                            name='gender'
                            control={control}
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
                            name='address'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DTextInput label='آدرس' withAsterisk {...field} />
                                    </DField>
                                )
                            }}
                        />
                    </div>
                    <div className='flex gap-x-6 justify-end'>
                        <DButton onClick={open} type='button' variant='subtle' leftSection={<IconDatabaseImport />}>
                            آپلود Excel
                        </DButton>
                        <DButton loading={isPending} type='submit' leftSection={<IconCheck />}>
                            ثبت
                        </DButton>
                    </div>
                </form>
            </section>

            <DModal opened={opened} title='آپلود فایل Excel' centered onClose={close}>
                <AdminCreateTeacherUploadModal onClose={close} />
            </DModal>
        </>
    )
}

export default AdminCreateTeacher
