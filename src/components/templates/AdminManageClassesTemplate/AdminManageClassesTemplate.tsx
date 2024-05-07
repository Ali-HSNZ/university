import { AdminClassesList, AdminCreateClass } from '@organisms/Admin/Classes'

const AdminManageClassesTemplate = () => {
    return (
        <section className='flex flex-col gap-6'>
            {/* create */}
            <AdminCreateClass />

            {/* list */}
            <AdminClassesList />
        </section>
    )
}

export default AdminManageClassesTemplate
