import { type Metadata } from 'next'

import { AdminManageLessonsTemplate } from '@templates/AdminManageLessonsTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | دروس',
}

const page = () => {
    return <AdminManageLessonsTemplate />
}

export default page
