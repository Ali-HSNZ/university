import { DButton } from '@atoms/DButton'
import { DSelect } from '@atoms/DSelect'
import { DTextInput } from '@atoms/DTextInput'

const AdminCreateLesson = () => {
    return (
        <form className='bg-white grid grid-cols-4 gap-6 p-6 mt-4'>
            <DTextInput withAsterisk label='عنوان' />
            <DSelect label='نوع درس' data={['تخصصی', 'عمومی اختیاری', 'پروژه', 'اختیاری', 'عمومی', 'پایه', 'جبرانی']} />
            <DSelect label='واحد تئوری' data={['0', '1', '2', '3']} />
            <DSelect label='واحد عملی' data={['0', '1', '2', '3']} />

            <div className='col-span-4 flex justify-end'>
                <DButton>ثبت</DButton>
            </div>
        </form>
    )
}

export default AdminCreateLesson
