import React, { type FC, useState } from 'react'

import { DButton } from '@atoms/DButton'
import { DSelect } from '@atoms/DSelect'

import { type IClassAssignmentProps } from './resources'
import { STATIC_CLASS_DATA } from '../..'

const ClassAssignment: FC<IClassAssignmentProps> = ({ close }) => {
    const [selectedClass, setSelectedClass] = useState<string | null>()

    const handleSelectedClass = (value: null | string) => {
        setSelectedClass(value)
    }

    return (
        <section>
            <DSelect
                label='نام درس'
                onChange={handleSelectedClass}
                data={['ریاضی گسسته', 'مدار منطقی', 'معادلات دیفرانسیل', 'گرافیک و متحرک سازی']}
            />

            {selectedClass && (
                <div className='mt-4 grid grid-cols-2 gap-3'>
                    {STATIC_CLASS_DATA.map((item) => (
                        <div key={item.id} className={`text-sm flex gap-1`}>
                            <p className='font-semibold'>{item.title}:</p>
                            <p className='font-normal'>{item.value}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className='flex gap-4 mt-4 justify-end'>
                <DButton onClick={close} variant='light'>
                    برگشت
                </DButton>
                <DButton disabled={!!!selectedClass} onClick={close}>
                    تایید
                </DButton>
            </div>
        </section>
    )
}

export default ClassAssignment
