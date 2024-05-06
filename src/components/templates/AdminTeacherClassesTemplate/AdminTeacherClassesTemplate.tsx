import { useRouter } from 'next/navigation'
import { IconArrowBack } from '@tabler/icons-react'

import AdminTeachersLessonsList from '@organisms/Admin/Teachers/Lessons/AdminTeacherLessonsList'

import { DButton } from '@atoms/DButton'

const AdminTeacherClassesTemplate = () => {
    const { push } = useRouter()

    return (
        <section>
            <div className='w-full flex justify-between items-center'>
                <p>کلاس های استاد محمد رضوی</p>
                <DButton onClick={() => push('/admin/teachers')} variant='outline' leftSection={<IconArrowBack />}>
                    لیست اساتید
                </DButton>
            </div>

            <div className='mt-6'>
                <AdminTeachersLessonsList />
            </div>
        </section>
    )
}

export default AdminTeacherClassesTemplate
