import { type Metadata } from 'next'

import { AdminManageTeachersTemplate } from '@templates/AdminManageTeachersTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | اساتید',
}

const page = () => {
    return <AdminManageTeachersTemplate />
}

export default page
