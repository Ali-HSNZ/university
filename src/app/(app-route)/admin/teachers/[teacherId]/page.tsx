import { type Metadata } from 'next'

import { AdminTeacherProfileTemplate } from '@templates/AdminTeacherProfileTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | پروفایل کاربری استاد',
}

const page = () => {
    return <AdminTeacherProfileTemplate />
}

export default page
