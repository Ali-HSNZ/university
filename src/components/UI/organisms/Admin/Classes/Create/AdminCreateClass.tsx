import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCheck } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { DField } from '@molecules/DField'

import { DButton } from '@atoms/DButton'
import { DDatePicker } from '@atoms/DDatePicker'
import { DSelect } from '@atoms/DSelect'

import { createClassMutationFn } from '@api/create-class'
import { getClassValidLessonsListFn } from '@api/get-class-lessons-list'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IAuthMutationFnProps } from '@core/types/data/auth'
import { type TClassValidLessonListType } from '@core/types/data/class-lessons-list'
import { type TCreateClassFormType } from '@core/types/forms-schema/create-class-form'
import { createClassFormSchema } from '@core/utils/validations/create-class-form'

const AdminCreateClass = () => {
    const {
        control,
        handleSubmit,
        setError,
        setValue,
        formState: { errors, defaultValues },
    } = useForm<TCreateClassFormType>({
        defaultValues: {
            lesson_id: '',
            day: '',
            end_time: '',
            start_time: '',
            test_date: '',
            test_time: '',
        },
        resolver: yupResolver(createClassFormSchema),
    })

    const queryClient = useQueryClient()

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: [QueryKeys.ClassValidLessons],
        })
    }, [queryClient])

    const { isFetching, data } = useQuery<TClassValidLessonListType[]>({
        queryKey: [QueryKeys.ClassValidLessons],
        queryFn: getClassValidLessonsListFn,
    })

    const { isPending, mutate } = useMutation({
        mutationFn: createClassMutationFn,
        onSuccess: (res: IAuthMutationFnProps) => {
            toast.success(res.message)
            // refetch classes list
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.ClassesList],
            })

            // reset form
            Object.entries(defaultValues as string).map(([key]) => {
                setValue(key as keyof TCreateClassFormType, null)
            })
        },
        onError: (err: TCriticalAny) => {
            if (err.code === 400) {
                const errors = err.errors

                for (const [key, value] of Object.entries(errors)) {
                    setError(key as keyof TCreateClassFormType, { type: 'custom', message: value as string })
                }
            } else {
                toast.error(err.message)
            }
        },
    })

    return (
        <section className='flex flex-col gap-y-6'>
            <p>ثبت کلاس</p>

            <form
                onSubmit={handleSubmit((formValues) => mutate(formValues))}
                className='bg-white grid grid-cols-4 gap-6 p-6'
            >
                <Controller
                    name='lesson_id'
                    control={control}
                    render={({ field }) => {
                        return (
                            <DField fieldName={field.name} fieldError={errors}>
                                <DSelect
                                    isLoading={isFetching}
                                    data={data ?? []}
                                    withAsterisk
                                    label='نام درس'
                                    {...field}
                                />
                            </DField>
                        )
                    }}
                />

                <Controller
                    name='start_time'
                    control={control}
                    render={({ field }) => {
                        return (
                            <DField fieldName={field.name} fieldError={errors}>
                                <DDatePicker
                                    disableDayPicker
                                    format='HH:mm'
                                    plugins={[<TimePicker hideSeconds key={0} />]}
                                    calendarPosition='bottom-right'
                                    label='ساعت شروع کلاس'
                                    withAsterisk
                                    {...field}
                                />
                            </DField>
                        )
                    }}
                />

                <Controller
                    name='end_time'
                    control={control}
                    render={({ field }) => {
                        return (
                            <DField fieldName={field.name} fieldError={errors}>
                                <DDatePicker
                                    disableDayPicker
                                    format='HH:mm'
                                    plugins={[<TimePicker hideSeconds key={0} />]}
                                    calendarPosition='bottom-right'
                                    label='ساعت پایان کلاس'
                                    withAsterisk
                                    {...field}
                                />
                            </DField>
                        )
                    }}
                />

                <Controller
                    name='day'
                    control={control}
                    render={({ field }) => {
                        return (
                            <DField fieldName={field.name} fieldError={errors}>
                                <DSelect
                                    withAsterisk
                                    label='روز برگزاری کلاس'
                                    data={['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه']}
                                    {...field}
                                />
                            </DField>
                        )
                    }}
                />

                <Controller
                    name='test_date'
                    control={control}
                    render={({ field }) => {
                        return (
                            <DField fieldName={field.name} fieldError={errors}>
                                <DDatePicker
                                    minDate={new Date()}
                                    onOpenPickNewDate={false}
                                    label='تاریخ آزمون'
                                    {...field}
                                />
                            </DField>
                        )
                    }}
                />

                <Controller
                    name='test_time'
                    control={control}
                    render={({ field }) => {
                        return (
                            <DField fieldName={field.name} fieldError={errors}>
                                <DDatePicker
                                    disableDayPicker
                                    format='HH:mm'
                                    plugins={[<TimePicker hideSeconds key={0} />]}
                                    calendarPosition='bottom-right'
                                    label='ساعت برگزاری آزمون'
                                    {...field}
                                />{' '}
                            </DField>
                        )
                    }}
                />

                <div className='col-span-4 flex justify-end'>
                    <DButton loading={isPending} type='submit' leftSection={<IconCheck />}>
                        ثبت
                    </DButton>
                </div>
            </form>
        </section>
    )
}

export default AdminCreateClass
