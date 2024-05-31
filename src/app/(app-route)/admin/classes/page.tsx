import { type Metadata } from 'next'

import { AdminManageClassesTemplate } from '@templates/AdminManageClassesTemplate'

export const metadata: Metadata = {
    title: 'سامانه دانشجویی | مدیریت کلاس ها',
}

const page = () => {
    return <AdminManageClassesTemplate />
}

export default page
