import React from 'react'

import { AdminLessonsFilesList, AdminTeachersFilesListTable } from '@organisms/Admin/Files'

const AdminManageFilesTemplate = () => {
    return (
        <section className='flex flex-col gap-6'>
            <AdminTeachersFilesListTable />
            <AdminLessonsFilesList />
        </section>
    )
}

export default AdminManageFilesTemplate
