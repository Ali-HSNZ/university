import { AdminCreateLesson, AdminLessonsList } from '@organisms/Admin/Lessons'

const AdminManageLessonsTemplate = () => {
    return (
        <section className='flex flex-col gap-6'>
            {/* create */}
            <AdminCreateLesson />

            {/* list */}
            <AdminLessonsList />
        </section>
    )
}

export default AdminManageLessonsTemplate
