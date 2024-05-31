import React from 'react'

import {
    AdminClassesFilesListTable,
    AdminLessonsFilesListTable,
    AdminPendingToAgreeFilesList,
    AdminTeachersFilesListTable,
} from '@organisms/Admin/Files'

const AdminManageFilesTemplate = () => {
    return (
        <section className='flex flex-col gap-6'>
            <AdminTeachersFilesListTable />
            <AdminLessonsFilesListTable />
            <AdminClassesFilesListTable />
            <AdminPendingToAgreeFilesList />
        </section>
    )
}

export default AdminManageFilesTemplate
