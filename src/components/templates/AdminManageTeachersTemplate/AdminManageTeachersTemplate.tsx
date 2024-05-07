import { AdminCreateTeacher, AdminManageTeachersList } from '@organisms/Admin/Teachers'

const AdminManageTeachersTemplate = () => {
    return (
        <section className='flex flex-col gap-6'>
            {/* add */}
            <AdminCreateTeacher />

            {/* list */}
            <AdminManageTeachersList />
        </section>
    )
}

export default AdminManageTeachersTemplate
