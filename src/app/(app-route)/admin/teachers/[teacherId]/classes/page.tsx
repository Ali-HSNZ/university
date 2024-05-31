import { type Metadata } from 'next'

import { AdminTeacherClassesTemplate } from '@templates/AdminTeacherClassesTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | کلاس های استاد',
}

const page = () => {
    return <AdminTeacherClassesTemplate />
}

export default page
