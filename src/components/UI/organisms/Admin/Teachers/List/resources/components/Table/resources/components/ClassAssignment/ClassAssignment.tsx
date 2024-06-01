import React, { type FC, type FormEvent, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { IconCheck } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { DButton } from '@atoms/DButton'
import { DSelect } from '@atoms/DSelect'

import { assignClassToTeacherMutationFn } from '@api/assign-class-to-teacher'
import { getAssignmentClassDayListFn } from '@api/get-assignment-class-day-list'
import { getAssignmentClassListFn } from '@api/get-assignment-class-list'
import { getAssignmentClassTestFn } from '@api/get-assignment-class-test'
import { getAssignmentClassTimeListFn } from '@api/get-assignment-class-time-list'

import { QueryKeys } from '@core/enums/query-keys'
import { type TCriticalAny } from '@core/types/critical-any'
import { type IBaseMutationFnProps } from '@core/types/data/base-response'

import { type IClassAssignmentProps } from './resources'

const ClassAssignment: FC<IClassAssignmentProps> = ({ close, rowDetail }) => {
    const [selectedClass, setSelectedClass] = useState<string | null>()
    const [selectedDay, setSelectedDay] = useState<string | null>()
    const [selectedTime, setSelectedTime] = useState<string | null>()
    const [selectedTest, setSelectedTest] = useState<string | null>()

    const queryClient = useQueryClient()

    const { isFetching: isFetchingClassTitleList, data: classTitleList } = useQuery<{ value: string; label: string }[]>(
        {
            queryKey: [QueryKeys.AssignmentClassList],
            queryFn: () => getAssignmentClassListFn(),
            staleTime: 0,
        }
    )

    const { isFetching: isFetchingClassDayList, data: classDayList } = useQuery<{ value: string; label: string }[]>({
        queryKey: [QueryKeys.AssignmentClassDayList, { selectedClass }],
        queryFn: () => getAssignmentClassDayListFn(selectedClass || ''),
        enabled: !!selectedClass,
        staleTime: 0,
    })

    const { isFetching: isFetchingClassTimeList, data: classTimeList } = useQuery<{ value: string; label: string }[]>({
        queryKey: [QueryKeys.AssignmentClassTimeList, { selectedClass, selectedDay }],
        queryFn: () => getAssignmentClassTimeListFn(selectedClass || '', selectedDay || ''),
        enabled: !!selectedClass && !!selectedDay,
        staleTime: 0,
    })

    const {
        isFetching: isFetchingClassTest,
        isError: isErrorClassTest,
        data: classTest,
    } = useQuery<{ test_date: string; test_time: string }>({
        queryKey: [QueryKeys.AssignmentClassTestList, { selectedClass, selectedDay, selectedTime }],
        queryFn: () => getAssignmentClassTestFn(selectedClass || '', selectedDay || '', selectedTest || ''),
        enabled: !!selectedClass && !!selectedDay && !!selectedTime,
        staleTime: 0,
    })

    const handleSelectedClassTitle = (value: null | string) => {
        setSelectedClass(value)
        setSelectedDay(null)
        setSelectedTime(null)
        setSelectedTest(null)
    }

    const handleSelectedClassDay = (value: null | string) => {
        setSelectedDay(value)
        setSelectedTime(null)
        setSelectedTest(null)
    }

    const handleSelectedClassTime = (value: null | string) => {
        setSelectedTime(value)
        if (classTimeList && classTimeList?.length > 0) {
            const time = classTimeList.find((e) => e.value === value)
            setSelectedTest(time?.label.substring(7, 13).trim())
        }
    }

    const renderTestText = useMemo(() => {
        let text = ''
        if (isFetchingClassTest) return 'در حال دریافت اطلاعات'
        if (isErrorClassTest) return 'خطا در برقراری ارتباط'
        if (classTest?.test_date === '' && classTest?.test_time === '') return 'نامشخص'
        if (classTest?.test_date) text = `در تاریخ ${classTest.test_date}`
        if (classTest?.test_time) text += ` ساعت ${classTest?.test_time}`
        return text + ' برگزار می‌شود'
    }, [classTest, isErrorClassTest, isFetchingClassTest])

    const { isPending, mutate } = useMutation({
        mutationFn: assignClassToTeacherMutationFn,
        onSuccess: (res: IBaseMutationFnProps) => {
            toast.success(res.message)

            // refetch lessens list
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.TeachersList],
            })
        },
        onError: (err: TCriticalAny) => {
            toast.error(err.message)
        },
        onSettled: () => {
            close()
        },
    })

    const onFormSubmit = (form: FormEvent) => {
        form.preventDefault()
        if (rowDetail) {
            const formValues = {
                user_code: rowDetail.code,
                classId: selectedClass,
                dayCode: selectedDay,
                start_time: selectedTest,
            }
            mutate(formValues)
        }
    }

    return (
        <form onSubmit={onFormSubmit} className='flex flex-col gap-6'>
            <DSelect
                label='نام درس'
                isLoading={isFetchingClassTitleList}
                onChange={handleSelectedClassTitle}
                data={classTitleList ?? []}
                value={selectedClass}
            />
            {selectedClass && (
                <DSelect
                    label='روز تشکیل کلاس'
                    isLoading={isFetchingClassDayList}
                    onChange={handleSelectedClassDay}
                    data={classDayList ?? []}
                    value={selectedDay}
                />
            )}

            {selectedDay && (
                <DSelect
                    label='ساعت تشکیل کلاس'
                    isLoading={isFetchingClassTimeList}
                    onChange={handleSelectedClassTime}
                    data={classTimeList ?? []}
                    value={selectedTime}
                />
            )}

            {selectedTest && (
                <div className='text-sm flex gap-1'>
                    <p className='font-normal'>آزمون</p>
                    {renderTestText}
                </div>
            )}

            <div className='flex gap-4  justify-end'>
                <DButton onClick={close} variant='light'>
                    برگشت
                </DButton>
                <DButton disabled={!!!selectedTime} loading={isPending} type='submit' leftSection={<IconCheck />}>
                    ثبت
                </DButton>
            </div>
        </form>
    )
}

export default ClassAssignment
