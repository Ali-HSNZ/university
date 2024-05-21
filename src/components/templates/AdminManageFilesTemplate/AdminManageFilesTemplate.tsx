import React from 'react'

import {
    AdminClassesFilesListTable,
    AdminLessonsFilesListTable,
    AdminTeachersFilesListTable,
} from '@organisms/Admin/Files'

const AdminManageFilesTemplate = () => {
    return (
        <section className='flex flex-col gap-6'>
            <AdminTeachersFilesListTable />
            <AdminLessonsFilesListTable />
            <AdminClassesFilesListTable />
        </section>
    )
}

export default AdminManageFilesTemplate
