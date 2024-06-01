import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useDisclosure } from '@mantine/hooks'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCheck, IconDatabaseImport } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DField } from '@molecules/DField'

import { DButton } from '@atoms/DButton'
import { DModal } from '@atoms/DModal'
import { DSelect } from '@atoms/DSelect'
import { DTextInput } from '@atoms/DTextInput'

import { createLessonMutationFn } from '@api/create-lesson'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IBaseMutationFnProps } from '@core/types/data/base-response'
import { type TCreateLessonForm } from '@core/types/forms-schema/create-lesson-form'
import { createLessonFormSchema } from '@core/utils/validations/create-lesson-form'

import { AdminCreateLessonUploadModal } from './resources'

const AdminCreateLesson = () => {
    const [opened, { open, close }] = useDisclosure()

    const {
        control,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<TCreateLessonForm>({
        defaultValues: {
            practical_unit: '',
            theory_unit: '',
            title: '',
            type: '',
        },
        resolver: yupResolver(createLessonFormSchema),
    })

    const queryClient = useQueryClient()

    const { isPending, mutate } = useMutation({
        mutationFn: createLessonMutationFn,
        onSuccess: (res: IBaseMutationFnProps) => {
            toast.success(res.message)

            // refetch lessens list
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.LessonsList],
            })

            // reset form
            const formValues = ['type', 'theory_unit', 'practical_unit']
            formValues.forEach((key) => {
                setValue(key as keyof TCreateLessonForm, null as TCriticalAny)
            })
            setValue('title', '')
        },
        onError: (err: TCriticalAny) => {
            if (err.code === 400) {
                const errors = err.errors
                for (const [key, value] of Object.entries(errors)) {
                    setError(key as keyof TCreateLessonForm, { type: 'custom', message: value as string })
                }
            } else {
                toast.error(err.message)
            }
        },
    })

    return (
        <>
            <section className='flex flex-col gap-6'>
                <p>ثبت درس</p>

                <form
                    onSubmit={handleSubmit((formValue) => mutate(formValue))}
                    className='bg-white flex flex-col gap-6 p-6'
                >
                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DTextInput maxLength={50} label='عنوان' withAsterisk {...field} />
                                    </DField>
                                )
                            }}
                        />

                        <Controller
                            name='type'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DSelect
                                            withAsterisk
                                            label='نوع درس'
                                            data={[
                                                'تخصصی',
                                                'عمومی اختیاری',
                                                'پروژه',
                                                'اختیاری',
                                                'عمومی',
                                                'پایه',
                                                'جبرانی',
                                            ]}
                                            {...field}
                                        />
                                    </DField>
                                )
                            }}
                        />

                        <Controller
                            name='theory_unit'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DSelect
                                            withAsterisk
                                            label='واحد تئوری'
                                            data={['0', '1', '2', '3', '6']}
                                            {...field}
                                        />
                                    </DField>
                                )
                            }}
                        />

                        <Controller
                            name='practical_unit'
                            control={control}
                            render={({ field }) => {
                                return (
                                    <DField fieldName={field.name} fieldError={errors}>
                                        <DSelect
                                            withAsterisk
                                            label='واحد عملی'
                                            data={['0', '1', '2', '3']}
                                            {...field}
                                        />
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
                <AdminCreateLessonUploadModal onClose={close} />
            </DModal>
        </>
    )
}

export default AdminCreateLesson
