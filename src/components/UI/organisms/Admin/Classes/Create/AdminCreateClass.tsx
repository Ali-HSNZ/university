import TimePicker from 'react-multi-date-picker/plugins/time_picker'

import { DButton } from '@atoms/DButton'
import { DDatePicker } from '@atoms/DDatePicker'
import { DSelect } from '@atoms/DSelect'

const AdminCreateClass = () => {
    return (
        <form className='bg-white grid grid-cols-4 gap-6 p-6 mt-4'>
            <DSelect label='نام درس' data={['ریاضی گسسته', 'معادلات دیفرانسیل', 'گرافیک و متحرک سازی']} />
            <DDatePicker
                disableDayPicker
                format='HH:mm'
                plugins={[<TimePicker hideSeconds key={0} />]}
                calendarPosition='bottom-right'
                label='ساعت شروع کلاس'
                withAsterisk
            />
            <DDatePicker
                disableDayPicker
                format='HH:mm'
                plugins={[<TimePicker hideSeconds key={0} />]}
                calendarPosition='bottom-right'
                label='ساعت پایان کلاس'
                withAsterisk
            />
            <DSelect label='روز برگزاری کلاس' data={['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه']} />

            <DDatePicker onOpenPickNewDate={false} label='تاریخ آزمون' withAsterisk />
            <DDatePicker
                disableDayPicker
                format='HH:mm'
                plugins={[<TimePicker hideSeconds key={0} />]}
                calendarPosition='bottom-right'
                label='ساعت برگزاری آزمون'
                withAsterisk
            />

            <div className='col-span-4 flex justify-end'>
                <DButton>ثبت</DButton>
            </div>
        </form>
    )
}

export default AdminCreateClass
